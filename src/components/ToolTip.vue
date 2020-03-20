<template>
    <component :is="tag" :title="tooltip" class="tooltip-span">
        <div class="tooltip">{{ text }}</div>
    </component>
</template>

<script>
export default {
    name: 'tooltip',
    props: {
        tag: {
            type: String,
            default: 'span'
        },
        tooltip: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    },
    mounted() {}
};
</script>
