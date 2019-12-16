<template>
    <button
        v-if="!pending"
        :disabled="disabled"
        class="btn action"
        :class="[classes]"
        @click="handleClick($event)"
    >
        <slot></slot>
    </button>
    <button v-else class="btn action btn-loader" disabled :class="[classes]">
        <img src="../../assets/img/loader.gif" alt="Loader" />
    </button>
</template>

<script>
export default {
    name: 'action-button',
    props: {
        classes: {
            type: Array,
            required: true
        },
        pending: {
            type: Boolean,
            required: true
        },
        pendingText: {
            type: String,
            default: 'Pending...'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        icon: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            clicked: this.pending
        };
    },
    methods: {
        handleClick(e) {
            this.clicked = true;
            this.$emit('click', e);
        }
    }
};
</script>
