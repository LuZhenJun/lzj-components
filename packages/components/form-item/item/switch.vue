<template>
    <el-switch v-model="form[$attrs.prop]" v-bind="$attrs" active-color="#13ce66" inactive-color="#ff4949" @change="$attrs.change || ''"></el-switch>
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
