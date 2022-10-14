<template>
    <el-table ref="multipleTable" :data="tableData" v-bind="$attrs" v-on="$listeners" :cell-class-name="cellConfigSet" @select="onSelect" @select-all="onSelect" style="width: 100%;">
<!--        <template #empty class="flex-ju-al-center">-->
<!--            <img class="my-24" src="https://frontendonline-erp.ocj.com.cn/img/nodata.png" alt="" />-->
<!--        </template>-->
        <el-table-column v-if="check" type="selection" width="44" :fixed="showFixed" />
        <el-table-column v-if="showExpand" type="expand" width="44" :fixed="showFixed">
            <template #default="scope">
                <slot v-bind="scope" name="expand" />
            </template>
        </el-table-column>
        <el-table-column
            v-for="(item, index) in tableColumn"
            :key="'tableColumn' + index"
            v-bind="{ ...item }"
            :fixed="showFixed && item.fixed"
            :show-overflow-tooltip="!item['hidden-overflow-tooltip']"
        >
            <template v-if="item.slotHeader" #header="scope">
                <slot v-bind="scope" :name="`${item.prop}Header`"></slot>
            </template>
            <template v-if="item.slotContent" #default="scope">
                <slot v-bind="scope" :name="`${item.prop}Content`"></slot>
            </template>
        </el-table-column>
        <el-table-column v-if="showOperation" :fixed="showFixed ? 'right' : false" label="操作" :width="operationWidth">
            <template #default="scope">
                <slot v-bind="scope" />
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'table-component',
    inheritAttrs: false,
    props: {
        tableData: {
            type: Array,
            default: () => []
        },
        tableColumn: {
            type: Array,
            default: () => []
        },
        // 是否可选择表格行
        check: Boolean,
        checkData: {
            type: Array,
            default: () => []
        },
        showExpand: Boolean,
        showFixed: Boolean,
        // 简化element-ui组件的cellClassName用法
        cellConfig: {
            type: Object,
            default: () => {}
        },
        // 优雅适配element-ui组件的cellClassName用法
        cellClassName: { type: Function },
        // 是否展示操作列
        showOperation: Boolean,
        // 操作列宽度
        operationWidth: {
            type: String,
            default: 'auto'
        }
    },
    mounted() {
        if (this.check && this.checkData.length > 0) {
            this.checkData.forEach(e => {
                this.$refs.multipleTable.toggleRowSelection(e);
            });
        } else {
            this.$refs.multipleTable.clearSelection();
        }
    },
    methods: {
        onSelect(data) {
            if (this.check) {
                return false;
            }
            this.$emit('on-select', data);
        },
        cellConfigSet(data) {
            const config = this.cellConfig;
            if (this.cellClassName) {
                return this.cellClassName(data);
            }
            if (!config) return;
            if (Object.keys(config).includes(data.column.property)) {
                return config[data.column.property][data.row[data.column.property]];
            }
        }
    }
};
</script>

<style scoped></style>
