<template>
    <div class="px-40">
        <div class="py-40 text-align-center font-weight-bold">components</div>
        <lzj-popover :value="showPopover" title="标题" type="danger" width="400" class="py-40" showIcon showFooter @show="showPopover = true" @cancel="showPopover = false" @ok="onOk">
            <div slot="content">
                文本内容
            </div>
            <el-button type="plain">点击触发popover</el-button>
        </lzj-popover>
        <div class="py-40">
            <lzj-pager :total="total" :page="pager" @change="pageChange"></lzj-pager>
        </div>
        <div class="px-40 py-40">
            <el-form ref="form" :model="form" :rules="rules" label-position="left" size="small">
                <lzj-form-item :form="form" :config="formConfig" :rules="rules" useLabel labelWidth="100px" column="4">
                    <template #demo>
                        <lzj-popover
                            :value="form.demo"
                            title="测试hasSlot"
                            type="danger"
                            width="400"
                            class="py-40"
                            showIcon
                            showFooter
                            @show="form.demo = true"
                            @cancel="form.demo = false"
                            @ok="form.demo = false"
                        >
                            <div slot="content">
                                测试hasSlot内容区块
                            </div>
                            <el-button type="plain">测试hasSlot</el-button>
                        </lzj-popover>
                    </template>
                </lzj-form-item>
                <div class="flex-ju-center">
                    <el-button @click="onCancel">取消</el-button>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'components-test',
    data() {
        return {
            showPopover: false,
            form: { lessRate: [], demo: false },
            formConfig: [
                { itemType: 'datePicker', prop: 'time', label: '查询期间', type: 'daterange', valueFormat: 'yyyy-MM-dd', span: 2 },
                { itemType: 'input', prop: 'input', label: '出库数' },
                {
                    itemType: 'select',
                    prop: 'count',
                    label: '总订购数量',
                    list: [
                        { label: '发过火的', value: 1 },
                        { label: '猜不出', value: 2 },
                        { label: '而且', value: 3 }
                    ]
                },
                {
                    itemType: 'radio',
                    prop: 'radio',
                    label: '品质不良率',
                    list: [
                        { label: '是', value: 1 },
                        { label: '否', value: 0 }
                    ]
                },
                {
                    itemType: 'checkbox',
                    prop: 'lessRate',
                    label: '品质不满率',
                    list: [
                        { label: '阿斯达', value: 1 },
                        { label: '曲儿', value: 2 },
                        { label: '这些', value: 3 }
                    ]
                },
                { itemType: 'inputNumber', prop: 'num', label: '货号' },
                { itemType: 'rate', prop: 'rate', label: '货号名称' },
                { itemType: 'slide', prop: 'slide', label: '供应商编号' },
                { itemType: 'switch', prop: 'switch', label: '供应商名称', activeValue: 1, inactiveValue: 0 },
                { prop: 'demo', label: '供应商编号名称', hasSlot: true }
            ],
            rules: {
                time: [{ required: true, message: '请选择QC申请期间', trigger: 'change' }],
                input: [{ required: true, message: '请输入出库数', trigger: 'blur' }],
                count: [{ required: true, message: '请选择总订购数量', trigger: 'change' }],
                radio: [{ required: true, message: '请选择品质不良率', trigger: 'change' }],
                lessRate: [{ required: true, message: '请选择品质不满率', trigger: 'change' }],
                num: [{ required: true, message: '请输入货号', trigger: 'change' }],
                rate: [{ required: true, message: '请输入货号名称', trigger: 'blur' }],
                slide: [{ required: true, message: '请输入供应商id', trigger: 'change' }],
                switch: [{ required: true, message: '请输入供应商名称', trigger: 'change' }],
                demo: [{ required: true, message: '请输入供应商名称', trigger: 'change' }]
            },
            pager: {
                pageNo: 1,
                pageSize: 10
            },
            total: 100
        };
    },
    mounted() {},
    methods: {
        onOk() {
            // 检验不成功 不做任何处理；检验成功之后，才将showPopover的值改为false
            this.showPopover = false;
        },
        pageChange(val) {
            this.pager = val;
        },
        onCancel() {
            this.$refs.form.resetFields();
        },
        onSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    console.log(this.form, '提交成功');
                }
            });
        }
    }
};
</script>
