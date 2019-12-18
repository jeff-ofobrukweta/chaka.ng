<template>
    <component
        :is="tag"
        :disabled="disabled || clicked"
        class="action"
        :class="[classes, tag === 'button' ? 'btn' : '']"
        @click="handleClick($event)"
    >
        <slot></slot>
    </component>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'custom-button',
    props: {
        classes: {
            type: Array,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: 'button'
        }
    },
    data() {
        return {
            clicked: false
        };
    },
    methods: {
        handleClick(e) {
            this.clicked = true;
            this.$emit('click');
            setTimeout(() => {
                this.clicked = false;
            }, 4000);
        }
    }
};
</script>
