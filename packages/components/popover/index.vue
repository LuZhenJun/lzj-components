<template>
    <el-popover v-bind="$attrs" v-on="$listeners">
        <div v-if="title" class="mb-12 font-weight-bold">
            <i v-if="showIcon" class="mr-8 font-16 el-icon-warning" :class="`color-${$attrs.type || 'blue'}`"></i>
            <span class="font-16">{{ title }}</span>
        </div>
        <slot name="content">{{ $attrs.content }}</slot>
        <div v-if="showFooter" class="mt-16 flex-end">
            <el-button class="border-outline bg-white" size="mini" @click="$emit('cancel')">取消</el-button>
            <el-button :type="$attrs.type || 'primary'" size="mini" @click="$emit('ok')">确定</el-button>
        </div>
        <span slot="reference"><slot></slot></span>
    </el-popover>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        title: String,
        showIcon: Boolean,
        showFooter: Boolean
    }
};
</script>
