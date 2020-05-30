import table from './table';
import popover from './popover';
import pager from './pager';
import formItem from './form-item';

const components = {
        table,
        popover,
        pager,
        'form-item': formItem
    },
    install = Vue => {
        Object.keys(components).forEach(e => Vue.component('lzj-' + e, components[e]));
    };

export default {
    install
};
