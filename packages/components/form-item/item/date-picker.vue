<template>
    <div class="w-100">
        <el-date-picker
            v-model="form[$attrs.prop]"
            v-bind="$attrs"
            :type="$attrs.type || 'date'"
            range-separato="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%"
            :placeholder="$attrs.placeholder || '选择日期'"
            @change="$attrs.change || ''"
        >
        </el-date-picker>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        form: {
            type: Object,
            default: () => {}
        }
    }
};
</script>

<style scoped></style>
