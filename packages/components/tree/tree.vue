<template>
    <div class="flex-1 mt-12 overflow-auto" style="height: calc(100% - 160px);">
        <el-tree
            v-if="isLazy"
            key="lazyTree"
            ref="hicLazyTree"
            node-key="id"
            empty-text="暂无数据"
            check-strictly
            :show-checkbox="$attrs.checkbox"
            :props="treeProps"
            :expand-click-node="false"
            :default-checked-keys="defaultId"
            :data="treeList"
            v-bind="$attrs"
            :render-content="comRenderContent"
            @node-click="clickNode"
            @node-expand="expand"
            @check-change="checkChange"
        ></el-tree>
        <el-tree
            v-else
            key="allTree"
            ref="hicAllTree"
            node-key="id"
            empty-text="暂无数据"
            check-strictly
            :show-checkbox="$attrs.checkbox"
            :props="treeProps"
            expand-click-node
            :default-checked-keys="defaultId"
            :data="treeList"
            v-bind="$attrs"
            :render-content="comRenderContent"
            @node-click="clickNode"
            @node-expand="expand"
            @check-change="checkChange"
        ></el-tree>
        <add-edit-dialog v-model="showDialog" v-bind="$attrs" :urlData="urlData" :title="title" :type="type" :node="node" :addLowerLevel="true" @ok="onADDEdit"></add-edit-dialog>
    </div>
</template>

<script>
import addEditDialog from './addEditDialog';
import { store, mutation } from './data.js';
export default {
    props: {
        urlData: Object
    },
    components: {
        addEditDialog
    },
    inheritAttrs: false,
    data() {
        return {
            treeProps: {
                children: 'children',
                label: this.label
            },
            title: '',
            type: '',
            showDialog: false,
            initId: null,
            node: null
        };
    },
    computed: {
        defaultId() {
            let defaultId = 0;
            if (store.treeList.length !== 0) {
                defaultId = store.treeList[0].id;
            }
            return [defaultId];
        },
        treeList() {
            return store.treeList;
        },
        isLazy() {
            return store.isLazy;
        }
    },
    created() {
        // mutation.refresh(this.url, this.queryParams);
        //     .then(() => {
        //     this.initId = store.current && store.current.id;
        //     if (this.initId) {
        //         this.$nextTick(() => {
        //             const node = this.$refs.tree.getNode(this.initId);
        //             node.isCurrent = true;
        //             mutation.select(store.current, node);
        //         });
        //     }
        // });
    },
    methods: {
        // 通过事件监听，实现节点新增与删除
        clickNode(data, node) {
            mutation.select(data, node);
            this.$emit('click-node', data, node);
        },
        expand(data, node) {
            mutation.select(data);
            this.$emit('click-node', data, node);
            // 已加载过的数据，不在加载
            if (data.children.length > 0) {
                return;
            }
            mutation.load(this.urlData.url, this.$attrs.queryParams, data.code);
        },
        checkChange() {
            let result = [],
                key = `hic${this.isLazy ? 'Lazy' : 'All'}Tree`,
                keys = this.$refs[this.$attrs.key || key].getCheckedKeys();
            for (let i = 0; i < keys.length; i++) {
                const element = this.$refs[this.$attrs.key || key].getNode(keys[i]);
                result.push(element);
            }
            this.$emit('check-change', result);
            mutation.checked(result);
        },
        onCommand({ val, data, node }) {
            if (val === 1 || val === 2) {
                mutation.select(data, node);
                this.title = val === 1 ? '新增' : '编辑';
                this.type = val === 1 ? 'save' : 'update';
                this.node = node;
                this.showDialog = true;
            }
            if (val === 0) {
                this.$http.post(this.urlData.modify, { ids: [data.id], state: data.state }).then(res => {
                    node.data.state = data.state ? 0 : 1;
                    mutation.updateState([data.id], data.state ? 'disable' : 'enable', node);
                });
            } else if (val === 3) {
                this.$http.post(this.urlData.delete, [data.id]).then(res => {
                    mutation.remove(node);
                });
            }
        },
        onADDEdit(data) {
            if (this.type === 'update') {
                mutation.edit(data.name, data.leafYn ? 1 : 0);
            } else {
                mutation.add(data, true);
            }
        },
        // render自定义样式渲染
        comRenderContent(h, { node, data }) {
            const that = this;
            let treeClass, textClass, isCurrent, simpleClass, leafYnClass, disableClass, iconClass, disableIcon, icon, addDropdownItem, editDropdownItem, stateDropdownItem, deleteDropdownItem;
            node.isLeaf = data.leafYn === 1;
            // 正常状态时class
            textClass = {
                'tree-node-text': true,
                'text-14': true,
                'color-dark-400': true,
                'pr-8': true
            };
            // 简单树class
            simpleClass = {};
            isCurrent = {
                'color-dark-400': true,
                'bg-success': true
            };
            // 叶子节点class
            leafYnClass = {
                'font-weight-bold': true
            };
            // 禁用状态class
            disableClass = {
                'color-danger': true,
                'cursor-not-allowed': true
            };
            // 树的计算class
            treeClass = () => {
                let obj = {};
                if (data.isCurrent) {
                    obj = Object.assign(textClass, isCurrent);
                }
                if (data.leafYn) {
                    if (that.$attrs.showState && !data.state) {
                        return Object.assign(obj, leafYnClass, disableClass);
                    }
                    return Object.assign(obj, leafYnClass);
                }
            };
            iconClass = {
                'o-icon': true,
                'text-16': true,
                'mr-8': true
            };
            // 禁用状态的icon
            disableIcon = function() {
                if (that.$attrs.showState) {
                    return (
                        <el-tooltip effect="dark" placement="top" content="已禁用">
                            <span class={[iconClass, 'color-danger']}>
                                <i class="el-icon-view"></i>
                            </span>
                        </el-tooltip>
                    );
                }
            };
            // 挂载icon
            icon = () => {
                if (data.leafYn && !data.state) {
                    return disableIcon();
                }
            };
            // 是否展示新增下级按钮
            addDropdownItem = function() {
                if (that.urlData.save && !data.leafYn) {
                    return (
                        <el-dropdown-item command={{ val: 1, data: data, node: node }}>
                            <el-button type="text" sizi="mini">
                                新增子级
                            </el-button>
                        </el-dropdown-item>
                    );
                }
            };
            // 是否展示编辑
            editDropdownItem = function() {
                if (that.urlData.update) {
                    return (
                        <el-dropdown-item command={{ val: 2, data: data, node: node }}>
                            <el-button type="text" sizi="mini">
                                编辑节点
                            </el-button>
                        </el-dropdown-item>
                    );
                }
            };
            // 是否展示启用禁用按钮
            stateDropdownItem = function() {
                if (that.urlData.update && that.$attrs.showState && data.leafYn) {
                    return (
                        <el-dropdown-item command={{ val: 0, data: data, node: node }}>
                            <el-button type="text" sizi="mini">
                                {!data.state ? '启用' : '禁用'}
                            </el-button>
                        </el-dropdown-item>
                    );
                }
            };
            // 是否展示删除
            deleteDropdownItem = function() {
                if (that.urlData.delete) {
                    return (
                        <el-dropdown-item command={{ val: 3, data: data, node: node }}>
                            <el-button type="text" sizi="mini">
                                删除节点
                            </el-button>
                        </el-dropdown-item>
                    );
                }
            };
            // 简单树结构
            if (!that.urlData.delete && !that.urlData.save && !that.urlData.update) {
                return <div>{data['name']}</div>;
            }
            return (
                <div class="flex-x-between flex-1">
                    <div class="flex-y-center">
                        {icon()}
                        <span class={treeClass()}>{data['name']}</span>
                    </div>
                    <el-dropdown size="small" trigger="hover" on-command={that.onCommand}>
                        <span className="el-dropdown-link">
                            <el-button type="text" icon="el-icon-more"></el-button>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            {addDropdownItem()}
                            {editDropdownItem()}
                            {stateDropdownItem()}
                            {deleteDropdownItem()}
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            );
        }
    }
};
</script>

<style scoped></style>
