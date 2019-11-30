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
    <button v-else class="btn action" disabled :class="[classes]">
        <span v-if="!icon">Pending</span>...
    </button>
</template>

<script>
export default {
    name: "form-button",
    props: {
        classes: {
            type: Array,
            required: true
        },
        pending: {
            type: Boolean,
            required: true
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
            this.$emit("click", e);
        }
    }
};
</script>
