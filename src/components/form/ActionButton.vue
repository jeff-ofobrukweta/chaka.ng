<template>
    <button v-if="!pending" class="btn action" :class="[classes]" @click="handleClick($event)">
        <slot></slot>
    </button>
    <button v-else class="btn action" disabled :class="[classes]">
        Pending...
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
