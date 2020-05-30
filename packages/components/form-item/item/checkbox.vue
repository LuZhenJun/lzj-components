<template>
    <el-checkbox-group v-model="form[$attrs.prop]" v-bind="$attrs" @change="$attrs.change(form) || ''">
        <el-checkbox v-for="(item, index) in $attrs.list" :key="`checkbox-${index}`" :label="item.value">{{item.label}}</el-checkbox>
    </el-checkbox-group>
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
