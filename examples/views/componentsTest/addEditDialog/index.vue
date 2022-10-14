<template>
    <div style="max-height: 680px; overflow: auto">
        <el-form ref="form" :model="form" label-position="left" size="small">
            <lzj-form-item :form="form" :config="formConfig">
                <template #goodName>
                    {{form.goodName}}
                </template>
                <template #searchBtn>
                    <el-button type="primary">查询</el-button>
                </template>
            </lzj-form-item>
        </el-form>
        <lzj-table :data="tableData" :column="tableColumn" border showExpand :checkbox="false" :showSlots="['index']">
            <template #index="scope">
                <span>{{ scope.$index + 1 }}</span>
            </template>
        </lzj-table>
        <lzj-pager :total="total" :page="pager" @change="pageChange"></lzj-pager>
        <div class="flex-end mt-20">
            <el-button @click="$emit('cancel')">取消</el-button>
            <el-button type="primary" @click="onSubmit">提交</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {goodName: '1345364'},
            formConfig: [
                { itemType: 'input', prop: 'goodNo', label: '货号' },
                { itemType: 'input', prop: 'goodName', label: '货号名称', hasSlot: true },
                { itemType: 'input', prop: 'searchBtn', label: '', hasSlot: true }
            ],
            goodList: [],
            tableData: [{ childTableData: [{}] }],
            pager: {
                pageNo: 1,
                pageSize: 10
            },
            total: 100,
            tableColumn: [
                { index: '序号' },
                { goodNo: '货号' },
                { goodNoName: '货号名称' },
                { goodNoName: '供应商编号' },
                { goodNoName: '供应商名称' },
                { goodNoName: '退换货理由' },
                { goodNoName: '运单号' },
                { goodNoName: '顾客订购时间' }
            ],
            tableColumnChild: [{ childIndex: '顺序' }, { accept: '接受明细' }, { content: '处理内容' }]
        };
    },
    methods: {
        pageChange(val) {
            this.pager = val;
        },
        onSubmit() {
            this.$emit('cancel');
        }
    }
};
</script>

<style scoped></style>
