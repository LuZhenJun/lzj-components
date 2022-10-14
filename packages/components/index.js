import table from './table';
import popover from './popover';
import pager from './pager';
import formItem from './form-item';
import tab from './tab';
import dialog from './dialog';
import drawer from './drawer';

const components = {
        table,
        popover,
        pager,
        'form-item': formItem,
        tab,
        dialog,
        drawer
    },
    install = Vue => {
        Object.keys(components).forEach(e => Vue.component('lzj-' + e, components[e]));
    };

export default {
    install
};
