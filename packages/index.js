import ElementUI from 'element-ui';
import components from './components';

const install = (Vue, options) => {
    // 全局注册外部配置、外部包（ElementUI、加密）、公共函数、过滤器、自定义指令、组件
    Vue.use(ElementUI);
    Vue.use(components);
};

export default {
    // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
    install
};