<template>
    <el-radio-group v-model="form[$attrs.prop]" v-bind="$attrs" @change="$attrs.change || ''">
        <el-radio v-for="(item, index) in $attrs.list" :key="`radio-${index}`" :label="item.value">{{ item.label }}</el-radio>
    </el-radio-group>
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
