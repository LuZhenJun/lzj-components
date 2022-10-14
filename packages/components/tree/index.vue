<template>
    <div class="tree flex-column px-24 pb-20 flex-1" :style="styleObj">
        <div v-if="$attrs.title" class="title pt-20">
            {{ $attrs.title }}
        </div>
        <slot v-else name="title"></slot>
        <div v-if="urlData.save || (urlData.update && showState && checkbox) " class="tree-search flex-y-center flex-x-between py-12">
            <el-button v-if="urlData.save" size="small" type="primary" icon="el-icon-plus" @click="showDialog = true">新增一级</el-button>
            <div v-if="urlData.update && showState && checkbox" class="dropdown d-flex">
                <el-button size="small" class="btn-lt-4">批量操作</el-button>
                <el-dropdown size="small" trigger="hover" split-button @command="onEditState">
                    <span></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="flex-ju-center" :disabled="enableState" :command="'enable'">启用</el-dropdown-item>
                        <el-dropdown-item class="flex-ju-center" :disabled="disableState" :command="'disable'">禁用</el-dropdown-item>
                        <el-dropdown-item v-if="urlData.delete" divided style="color: #f5222d" :disabled="deleteState" :command="'delete'">删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <!--        <el-input v-if="urlData.search" ref="treeSearch" placeholder="搜索" v-model="searchContent" clearable size="small" @change="onSearchChange">-->
        <!--            <i class="el-icon-search el-input__icon" slot="suffix" @click="onSearchChange"></i>-->
        <!--        </el-input>-->
        <tree v-if="loaded" v-bind="$attrs" v-on="$listeners" :urlData="urlData" :showState="showState" :checkbox="checkbox" />
        <div v-if="urlData.update && switchDisable" class="border-top flex-center pt-16">
            <el-checkbox v-model="noDisable" @change="changeNoDisable"></el-checkbox>
            <span class="ml-12">不显示禁用类目</span>
        </div>
        <add-edit-dialog
            v-model="showDialog"
            title="新增"
            type="save"
            :urlData="urlData"
            :addLowerLevel="false"
            :formConfig="$attrs.formConfig"
            :orgCode="$attrs.orgCode"
            :rulesData="$attrs.rulesData"
            @ok="onAdd"
        ></add-edit-dialog>
    </div>
</template>

<script>
import tree from './tree';
import addEditDialog from './addEditDialog';
import { store, mutation } from './data';
export default {
    components: { tree, addEditDialog },
    props: {
        urlData: { type: Object, default: () => {} },
        label: { type: String, default: 'name' },
        // 是否多选
        checkbox: { type: Boolean, default: false },
        // 是否可禁用启用
        showState: { type: Boolean, default: false },
        // 是否不需要显示禁用节点，用以控制底部选择"是否不显示禁用"展示
        switchDisable: { type: Boolean, default: false },
        width: [String, Number]
    },
    inheritAttrs: false,
    data() {
        return {
            searchContent: '',
            noDisable: false,
            showDialog: false
        };
    },
    computed: {
        current() {
            return store.current || {};
        },
        loaded() {
            return store.loaded;
        },
        treeCheckData() {
            return store.selected;
        },
        enableState() {
            return store.selected.filter(e => e.data.state === 0).length === 0;
        },
        disableState() {
            return store.selected.filter(e => e.data.state === 1).length === 0;
        },
        deleteState() {
            return store.selected.length === 0;
        },
        styleObj() {
            console.log(this.width, 'this.$attr');
            return {
                width: this.width ? this.width + 'px' : '300px'
            };
        }
    },
    watch: {
        current(val) {
            if (val) {
                this.$emit('click-node', val);
            }
        }
    },
    created() {
        mutation.refresh(this.urlData.url, this.$attrs.queryParams);
    },
    mounted() {
        // 搜索暂时不开放
        // let that = this;
        // if (this.urlData.search && this.loaded) {
        //     this.$refs.treeSearch.$el.addEventListener('keyup', event => {
        //         event.preventDefault();
        //         if (event.keyCode === 13) {
        //             that.onSearchChange(that.searchContent);
        //         }
        //     });
        // }
    },
    methods: {
        // 刷新重绘树
        refresh() {
            store.current = null;
            store.selected = [];
            store.treeList = [];
            mutation.refresh(this.urlData.url, this.$attrs.queryParams);
        },
        // 树批量启用、禁用、删除
        onEditState(val) {
            const obj = {
                enable: ['启用', 'success', 'enable', 1],
                disable: ['禁用', 'warning', 'disable', 0],
                delete: ['删除', 'error', 'delete', 2]
            };
            this.onConfirm(...obj[val]);
        },
        // 批量操作二次确认
        onConfirm(text, type, urlType, state) {
            this.$confirm(`是否批量${text}数据`, `批量${text}`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type,
                center: true
            })
                .then(() => {
                    this.httpEditState(urlType, state);
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: `已取消批量${text}`
                    });
                });
        },
        // 批量操作请求接口
        httpEditState(urlType, state) {
            const ids = this.treeCheckData.map(e => e.data.id);
            if (state === 2) {
                this.$http
                    .post(
                        this.urlData.delete,
                        ids
                    )
                    .then(res => {
                        mutation.updateState(ids, '');
                    });
            } else {
                this.$http.post(this.urlData.modify, { ids, state: state }).then(res => {
                    mutation.updateState(ids, urlType);
                });
            }
        },
        // 搜索，全量树数据展示
        onSearchChange(val) {
            if (val) {
                mutation.search(this.urlData.search, Object.assign(this.queryParams, { searchContent: val }));
            }
        },
        changeNoDisable(val) {
            store.current = null;
            store.selected = [];
            store.treeList = [];
            mutation.refresh(this.urlData.url, Object.assign(this.$attrs.queryParams, { state: val ? 1 : '' }));
        },
        onAdd(data) {
            this.$http.post(this.urlData.save, data).then(res => {
                mutation.add(data, false);
            });
        }
    }
};
</script>
