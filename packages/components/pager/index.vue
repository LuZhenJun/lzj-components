<template>
    <el-pagination
        v-bind="$attrs"
        :current-page="$attrs.page.pageNo || 1"
        :page-size="$attrs.page.pageSize || 10"
        :layout="$attrs.layout || 'total, sizes, prev, pager, next, jumper'"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
</template>

<script>
export default {
    inheritAttrs: false,
    methods: {
        handleSizeChange(val) {
            this.$emit('change', { pageNo: this.$attrs.page.pageNo || 1, pageSize: val });
        },
        handleCurrentChange(val) {
            this.$emit('change', { pageNo: val, pageSize: this.$attrs.page.pageSize || 10 });
        }
    }
};
</script>
