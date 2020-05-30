<template>
    <div class="flex-wrap">
        <el-form-item
            v-for="(item, index) in config"
            :key="`form-item-${index}`"
            :prop="item.prop || ''"
            :label="item.label || ''"
            :label-width="setWidth(item, index)"
            :class="(item.proportion && `col-${item.proportion * colVal}`) || `col-${colVal}`"
        >
            <component
                v-if="!item.hasSlot && item.itemType !== 'text'"
                :is="`item-${item.itemType}`"
                :form="form"
                :disabled="item.disabled || disabled"
                :clearable="item.clearable || clearable"
                :style="{ width: item.width || width }"
                v-bind="{ ...item }"
            ></component>
            <slot v-else-if="item.hasSlot && item.itemType !== 'text'" :name="item.prop"></slot>
            <span v-else> {{ (item.formatter && item.formatter(form)) || form[item.prop] }} </span>
        </el-form-item>
        <el-form-item v-if="$slots.default" label-width="0px" class="flex-auto">
            <slot></slot>
        </el-form-item>
    </div>
</template>

<script>
import itemCheckbox from './item/checkbox';
import itemDatePicker from './item/date-picker';
import itemInput from './item/input';
import itemInputNumber from './item/input-number';
import itemRadio from './item/radio';
import itemRate from './item/rate';
import itemSelect from './item/select';
import itemSlide from './item/slide';
import itemSwitch from './item/switch';
export default {
    components: {
        itemCheckbox,
        itemDatePicker,
        itemInput,
        itemInputNumber,
        itemRadio,
        itemRate,
        itemSelect,
        itemSlide,
        itemSwitch
    },
    props: {
        form: { type: Object, default: () => {} },
        config: { type: Array, default: () => [] },
        rules: { type: Object, default: () => ({}) }, // 传进来的共享的form验证规则
        column: {
            type: [String, Number],
            default: 4,
            validator: value => {
                return [1, 2, 3, 4, 6].includes(parseInt(value));
            }
        },
        width: String,
        disabled: Boolean,
        clearable: Boolean,
        useLabel: Boolean,
        labelWidth: String
    },
    computed: {
        colVal() {
            return 24 / this.column;
        },
        columnLabelWidth() {
            // rowList每一行的数据，初始化的时候给一个二维数组，并制定第一个参数为new Array（）
            // columnList每一列的数据
            const rowList = [new Array(parseInt(this.column))],
                columnList = [];
            // count用来计算是否换行新增rowList的数组元素空数组，用来填补二维数组空位
            // index代表的是rowList的当前操作项的下标
            let count = 0,
                index = 0;
            this.config.forEach((e, i, arr) => {
                count += e.span || 1;
                rowList[index][count - (e.span || 1)] = { name: e.label, prop: e.prop, index: i };
                if (count + ((arr[i + 1] || {}).span || 1) > parseInt(this.column) && arr[i + 1]) {
                    rowList.push(new Array(parseInt(this.column)));
                    index++;
                    count = 0;
                }
            });
            // 行数据转列数据
            rowList.forEach(e => {
                for (let i = 0; i < e.length; i++) {
                    if (!columnList[i]) {
                        columnList[i] = [];
                    }
                    columnList[i].push(e[i]);
                }
            });
            // 取出每一列最大值nameLength
            // 取出每一列的index下标
            return columnList.map(e => {
                const nameLength = Math.max.apply(
                    null,
                    e.map(el => (el && this.charCode(el.name).length / 4) || 0)
                );
                let hasRules = false;
                e.map(el => {
                    if (el && el.name && this.rules[el.prop] && this.rules[el.prop][0].required) {
                        hasRules = true;
                    }
                });
                const indexList = e.map(el => el && el.index);
                return { nameLength, indexList, hasRules };
            });
        }
    },
    methods: {
        setWidth(item, index) {
            if (this.useLabel) return this.labelWidth;
            // 增加rules为入参，判断当前项是否有必填校验，如果有那么width加上11px；
            let val = this.columnLabelWidth.find(e => e.indexList.includes(index));
            const rulesWidth = val.hasRules ? 11 : 0;
            return val.nameLength * 14 + rulesWidth + 16 + 'px';
        },
        charCode: str => str.split('').reduce((total, e) => total + e.codePointAt(0).toString(16), '')
    }
};
</script>

<style scoped></style>
