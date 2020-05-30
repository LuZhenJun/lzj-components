<template>
    <el-select v-model="form[$attrs.prop]" v-bind="$attrs" @change="$attrs.change || ''">
        <el-option v-for="(item, index) in $attrs.list" :key="`select-${index}`" :label="item.label" :value="item.value"></el-option>
    </el-select>
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