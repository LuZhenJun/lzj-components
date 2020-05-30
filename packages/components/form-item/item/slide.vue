<template>
    <el-slider v-model="form[$attrs.prop]" @change="$attrs.change || ''"></el-slider>
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