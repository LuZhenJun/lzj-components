<template>
    <div class="px-40">
        <div class="py-40 text-align-center font-weight-bold">components</div>
        <el-form ref="form1" :model="form1" :rules="rules1" label-position="left" size="small">
            <lzj-form-item :form="form1" :config="formConfig1"></lzj-form-item>
        </el-form>
        <el-form ref="form2" :model="form2" :rules="rules2" label-position="left" size="small">
            <lzj-form-item :form="form2" :config="formConfig2"></lzj-form-item>
        </el-form>
        <el-form ref="form3" :model="form3" :rules="rules3" label-position="left" size="small">
            <lzj-form-item :form="form3" :config="formConfig3"></lzj-form-item>
        </el-form>
        <el-button type="primary" @click="submitForm">提交</el-button>
<!--        <lzj-popover :value="showPopover" title="标题" type="danger" width="400" class="py-40" showIcon showFooter @show="showPopover = true" @cancel="showPopover = false" @ok="onOk">-->
<!--            <div slot="content">-->
<!--                文本内容-->
<!--            </div>-->
<!--            <el-button type="plain">点击触发popover</el-button>-->
<!--        </lzj-popover>-->
<!--        <div class="py-40">-->
<!--            <lzj-pager :total="total" :page="pager" @change="pageChange"></lzj-pager>-->
<!--        </div>-->
<!--        <div class="pt-20">-->
<!--            <lzj-dialog title="新增" :outClose="outClose" width="960px">-->
<!--                <el-button type="primary">新增</el-button>-->
<!--                <template #contain>-->
<!--                    <add-edit-dialog @cancel="outClose = !outClose"></add-edit-dialog>-->
<!--                </template>-->
<!--            </lzj-dialog>-->
<!--        </div>-->
<!--        <div class="px-40 py-40">-->
<!--            <el-form ref="form" :model="form" :rules="rules" label-position="left" size="small">-->
<!--                <lzj-form-item :form="form" :config="formConfig" :rules="rules" labelWidth="100px">-->
<!--                    <template #demo>-->
<!--                        <el-input v-model="form.demo" @change="demoChange" @blur="demoBlur"></el-input>-->
<!--                    </template>-->
<!--                </lzj-form-item>-->
<!--                <div class="flex-ju-center">-->
<!--                    <el-button @click="onCancel">取消</el-button>-->
<!--                    <el-button type="primary" @click="onSubmit">确定</el-button>-->
<!--                </div>-->
<!--            </el-form>-->
<!--        </div>-->
<!--        <div class="px-40 py-40">-->
<!--            <lzj-table :tableData="tableData" :tableColumn="tableColumn" check showFixed showExpand showOperation :cellConfig="cellConfig" :checkData="multipleSelection" @on-select="onSelect">-->
<!--                <template #expand="scope">-->
<!--                    <div>-->
<!--                        <span>{{ scope.row.status }}</span>-->
<!--                    </div>-->
<!--                </template>-->
<!--                <template #default="scope">-->
<!--                    <el-button type="text" @click="onDelete(scope.row)">删除</el-button>-->
<!--                </template>-->
<!--            </lzj-table>-->
<!--        </div>-->
    </div>
</template>

<script>
import addEditDialog from './addEditDialog';
export default {
    name: 'components-test',
    components: {
        addEditDialog
    },
    data() {
        return {
            tableData: [
                {
                    id: '324354',
                    name: 'luzhenjun',
                    status: 5,
                    remark: '房管局哈斯卡的结论是开发；的关联方或',
                },
                {
                    id: '324354',
                    name: 'luzhenjun',
                    status: 0,
                    remark: '房管局哈斯卡的结论是开发；的关联方或',
                },
                {
                    id: '324354',
                    name: 'luzhenjun',
                    status: 1,
                    remark: '房管局哈斯卡的结论是开发；的关联方或',
                }
            ],
            tableColumn: [
                {
                    prop: 'id',
                    label: 'id'
                },
                {
                    prop: 'name',
                    label: '名称'
                },
                {
                    prop: 'status',
                    label: '状态',
                    fixed: true,
                    formatter: row => {
                        const data = { 0: '禁用', 1: '启用' };
                        return data[row.status] || row.status;
                    }
                },
                {
                    prop: 'remark',
                    label: '备注',
                    width: 200
                },
                {
                    prop: 'id',
                    label: 'id'
                },
                {
                    prop: 'name',
                    label: '名称'
                },
                {
                    prop: 'status',
                    label: '状态',
                    formatter: row => {
                        const data = { 0: '禁用', 1: '启用' };
                        return data[row.status] || row.status;
                    }
                },
                {
                    prop: 'remark',
                    label: '备注',
                    width: 200
                },
                {
                    prop: 'id',
                    label: 'id'
                },
                {
                    prop: 'name',
                    label: '名称'
                },
                {
                    prop: 'status',
                    label: '状态',
                    formatter: row => {
                        const data = { 0: '禁用', 1: '启用' };
                        return data[row.status] || row.status;
                    }
                },
                {
                    prop: 'remark',
                    label: '备注',
                    width: 200
                }
            ],
            cellConfig: {
                status: { 0: 'color-warning', 1: 'color-success' }
            },
            showPopover: false,
            outClose: false,
            form: { lessRate: [], demo: '', input: '21342536dsafsgfdhgfjhgkjhlkjdfsgdhfjhgkhkldafsgdhjkh' },
            formConfig1: [{itemType: 'input', prop: 'input', label: '出库数' }],
            formConfig2: [{itemType: 'input', prop: 'input', label: '12数' }],
            formConfig3: [{itemType: 'input', prop: 'input', label: '出sda库数' }],
            form1: {},
            form2: {},
            form3: {},
            rules: {
                input: [{required: true, message: '请输入出库数', trigger: 'blur'}],
            },
            rules1: {
                input: [{required: true, message: '请输入出库数', trigger: 'blur'}],
            },
            rules2: {
                input: [{required: true, message: '请输入出库数', trigger: 'blur'}],
            },
            rules3: {
                input: [{required: true, message: '请输入出库数', trigger: 'blur'}],
            },
            pager: {
                pageNo: 1,
                pageSize: 10
            },
            total: 100,
        };
    },
    mounted() {},
    methods: {
        demoBlur(val) {
            console.log(val, 'demoBlur');
        },
        demoChange(val) {
            console.log(val, 'demoChange');
        },
        onOk() {
            // 检验不成功 不做任何处理；检验成功之后，才将showPopover的值改为false
            this.showPopover = false;
        },
        onSelect(data) {
            this.multipleSelection = data;
            console.log(this.multipleSelection, 'multipleSelection');
        },
        onDelete(row) {
            console.log(row, '删除');
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
        },
        refForm() {
            let that = this;
            const refs = ['form1', 'form2', 'form3'], results = refs.map(
                e => new Promise((resolve, reject) => {
                    that.$refs[e].validate((valid) => {
                        if (valid) {
                            resolve(valid);
                        } else {
                            reject('校验失败');
                        }
                    });
                })
            );
            return Promise.all(results);
        },
        submitForm() {
            this.refForm().then(res => {
                console.log(res, 'res');
                //验证全部通过
            }).catch(err => {
                //验证失败 提示reject失败状态的值
                console.log(err, 'err');
            });
        },
    }
};
</script>
