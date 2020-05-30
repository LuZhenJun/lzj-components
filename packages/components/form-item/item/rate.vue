<template>
    <el-rate v-model="form[$attrs.prop]" v-bind="$attrs" @change="$attrs.change || ''"></el-rate>
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
    }
</script>

<style scoped>

</style>