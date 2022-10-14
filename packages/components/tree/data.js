import Vue from 'vue';
// import mainVue from '../../http';
let treeNode = null;
const store = Vue.observable({
        searchContent: null, // 类目树搜索数据
        treeList: [], // 类目树数据
        selected: [], // 类目树多选选中数据
        isLazy: true, // 类目树是否懒加载
        current: null, // 当前选中的节点数据
        treeNode: null, // 当前选中的节点
        loaded: false,
        params: {
            state: '' // 是否不显示禁用类目
        }
    }),
    mutation = {
        // 搜索树
        async search(url, params) {
            if (!params.searchContent) {
                return this.refresh(url, params);
            }
            let data =
                (await this.$http.post(url, Object.assign(store.params, params)).then(res => {
                    return res.data;
                })) || [];
            if (!data) {
                return;
            }
            store.isLazy = false;
            store.treeList = data;
            store.loaded = true;
        },
        // 重新刷新左边树数据
        refresh(url, params) {
            store.isLazy = true;
            store.treeList = [];
            store.current = null;
            store.selected = [];
            return mutation.load(url, params);
        },
        // 异步加载树
        load(url, params = {}, parentCode) {
            params.parentCode = null;
            store.loaded = false;
            if (store.current) {
                params.parentCode = parentCode;
            }
            mainVue.$http.post(url, Object.assign(store.params, params)).then(res => {
                const data = res.data;
                if (!data) {
                    return;
                }
                data.forEach(item => {
                    //  映射后端返回值
                    item.children = [];
                    if (store.current) {
                        store.current.children.push(item);
                    } else {
                        store.treeList.push(item);
                    }
                });
                // if (!parentCode) {
                //     store.current = data[0];
                // }
            });
            store.loaded = true;
        },
        // 点击选择
        select(item, node) {
            treeNode = node;
            store.treeNode = node;
            store.current = item;
        },
        // 修改节点类型
        edit(text, leafYnValue) {
            if (!treeNode || !store.current) {
                return;
            }
            console.log(text, leafYnValue);
            store.current.name = text;
            treeNode.name = text;
            store.current.leafYn = leafYnValue;
            treeNode.isLeaf = leafYnValue === 1;
        },
        // 多选选择
        checked(items) {
            store.selected = items;
        },
        // 获取选中项的code数组
        getSelectedById(id) {
            for (let i = 0; i < store.selected.length; i++) {
                const item = store.selected[i];
                if (item.data.id === id) {
                    return item;
                }
            }
            return null;
        },
        // 启用禁用删除
        updateState(ids, type, node) {
            // 操作store中的节点数据才能直接对树组件做状态更新
            // 当node存在，则为单节点的启用禁用操作，不传node时，则为批量操作
            if (node) {
                store.treeNode = node;
                switch (type) {
                case 'disable':
                    store.treeNode.state = 0;
                    break;
                case 'enable':
                    store.treeNode.state = 1;
                    break;
                }
                return;
            }
            for (let i = 0; i < ids.length; i++) {
                // 获得数据code对应的节点对象
                const item = this.getSelectedById(ids[i]);
                switch (type) {
                case 'delete':
                    // 删除节点对象
                    this.remove(item);
                    break;
                case 'disable':
                    // 修改节点对象的状态数据
                    item.data.state = 0;
                    break;
                case 'enable':
                    // 修改节点对象的状态数据
                    item.data.state = 1;
                    break;
                }
            }
        },
        // 新增分为新增一级和新增下级, type: false 新增一级、true 新增下级
        // item是需要后端返回数据，否则在页面上新增的节点没办法做删除和编辑操作，没有id
        add(item, type) {
            item.children = [];
            if (type) {
                store.current.children.unshift(item);
            } else {
                store.treeList.unshift(item);
            }
        },
        // 删除当前节点
        remove(node) {
            const parent = node.parent,
                data = node.data,
                children = parent.data.children || parent.data,
                index = children.findIndex(d => d.code === data.code),
                deleteArr = children.splice(index, 1);
            node.remove();
            if (deleteArr.find(e => e.code === store.current.code)) {
                store.current = store.treeList[0];
            }
            // store.current = null;
        }
    };

export { store, mutation };
