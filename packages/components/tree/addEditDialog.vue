<template>
    <el-dialog class="calcDialog" :title="title" width="960px" append-to-body top="5%" :visible.sync="dialogVisible" @close="onCancel">
        <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="120px" size="small">
            <idc-form-item :form="form" :config="formConfig" col="24"></idc-form-item>
            <!--            <el-form-item label="名称" prop="name">-->
<!--                <el-input type="text" placeholder="请输入" v-model="form.name" maxlength="20" show-word-limit></el-input>-->
<!--            </el-form-item>-->
<!--            <idc-form-item :form="form" :config="formConfig" col="24"></idc-form-item>-->
<!--            <el-form-item label="是否叶子级" prop="leafYn">-->
<!--                <el-switch v-model="form.leafYn" active-color="#13ce66" inactive-color="#C9CED6"></el-switch>-->
<!--                <span class="ml-8 switch-true">{{ form.leafYn ? '是' : '否' }}</span>-->
<!--            </el-form-item>-->
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { store } from './data';
export default {
    props: {
        // 外部传入v-model,控制dialog的显示隐藏
        value: {
            type: Boolean,
            default: false
        },
        title: String,
        type: String,
        addLowerLevel: {
            type: Boolean,
            default: false
        },
        orgCode: [String, Number],
        formConfig: Array,
        node: { type: Object, default: () => {} },
        rulesData: { type: Object, default: () => {} }
    },
    data() {
        return {
            // 表单数据
            form: {},
            // 组件内部控制dialog显示隐藏
            dialogVisible: this.value,
            // 表单验证
            rules: this.rulesData
        };
    },
    computed: {
        current() {
            return store.current || {};
        }
    },
    watch: {
        value(val) {
            if (!val) {
                return false;
            }
            if (this.node) {
                this.form.parentCode = this.node.data.code
            } else {
                this.form.parentCode = 0;
            }
            this.form.orgCode = this.orgCode;
            if (this.type === 'update') {
                this.form = JSON.parse(JSON.stringify(this.current));
                this.form = Object.assign(this.form, {leafYn: this.form.leafYn ? true : false});
                // this.formConfig.forEach(e => {
                //     formData[e.prop] = data[e.prop] || '';
                // });
                // formData = Object.assign(this.form, {leafYn: data.leafYn ? true : false});
                // this.form = JSON.parse(JSON.stringify(formData)) || {};
            }
            this.dialogVisible = val;
        }
    },
    methods: {
        onCancel() {
            this.dialogVisible = false;
            this.form = {};
            this.$refs.form.resetFields();
            this.$emit('input', false);
        },
        // 提交
        onSubmit() {
            const that = this;
            if (this.type === 'update' && this.form.leafYn && this.current.children.length > 0) {
                this.form.leafYn = false;
                this.$message.warning('不能将含有子类的父级修改成叶子级');
                return;
            }
            this.$refs['form'].validate(valid => {
                if (valid) {
                    this.$http.post(that.$attrs.urlData[that.type], Object.assign(that.form, { leafYn: that.form.leafYn ? 1 : 0 })).then(res => {
                        that.$emit('ok', res.data);
                        that.onCancel();
                    });
                } else {
                    console.log('error submit!');
                }
            });
        }
    }
};
</script>

<style scoped></style>
