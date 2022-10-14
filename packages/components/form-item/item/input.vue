<template>
    <el-input v-model="form[$attrs.prop]" v-bind="$attrs" @change="$attrs.change || ''" @blur="$attrs.blur || ''"></el-input>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        form: {
            type: Object,
            default: () => {}
        }
    }
};
</script>

<style scoped></style>
