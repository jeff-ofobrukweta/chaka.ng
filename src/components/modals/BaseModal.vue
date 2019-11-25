<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal__underlay" @click="closeModal"></div>
            <div class="modal-wrapper">
                <div class="modal-container" :class="{ 'modal-container__full': fullOnMobile }">
                    <div class="modal-header" v-if="!noHeader">
                        <h4 class="modal-header__text"><slot name="header">Title</slot></h4>
                        <a @click="$emit('close')">CLOSE</a>
                    </div>

                    <div class="modal-body">
                        <slot> </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "modal",
    props: {
        closeOnClick: {
            type: Boolean,
            default: true
        },
        fullOnMobile: {
            type: Boolean,
            default: false
        },
        noHeader: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        closeModal() {
            if (this.closeOnClick) {
                this.$emit("close");
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
