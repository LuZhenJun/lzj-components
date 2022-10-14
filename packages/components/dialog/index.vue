<template>
    <span @click.stop="showDialog = true">
        <slot></slot>
        <el-dialog v-if="showDialog" v-bind="$attrs" append-to-body visible top="5%" :class="single ? 'calcDialog' : ''" @close="onCancel">
          <slot v-if="showDialog" name="title"></slot>
          <slot v-if="showDialog" name="contain" class="absolute-all"></slot>
        </el-dialog>
    </span>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        single: { type: Boolean, default: false },
        outClose: { type: Boolean, required: true, default: true }
    },
    data() {
        return { showDialog: false };
    },
    watch: {
        outClose() {
            this.onCancel();
        }
    },
    methods: {
        onCancel() {
            this.showDialog = false;
            this.$emit('cancel');
        }
    }
};
</script>

<style scoped></style>
