<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal__underlay" @click="closeModal"></div>
            <div class="modal-wrapper">
                <div class="modal-container" :class="{ 'modal-container__full': fullOnMobile }">
                    <div class="modal-header" v-if="!noHeader">
                        <h4 class="modal-header__text"><slot name="header">Title</slot></h4>
                        <a @click="emitClose" class="modal-header__close"
                            ><svg
                                width="27"
                                height="28"
                                viewBox="0 0 27 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.54102 7.45898L19.6225 20.5405"
                                    stroke="#BDBDBD"
                                    stroke-width="1.68182"
                                />
                                <path
                                    d="M6.54102 20.541L19.6225 7.45954"
                                    stroke="#BDBDBD"
                                    stroke-width="1.68182"
                                />
                            </svg>
                        </a>
                    </div>

                    <slot name="subheader"></slot>

                    <div class="modal-body">
                        <slot> </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapMutations } from 'vuex';
import EventBus from '../../event-bus';

export default {
    name: 'modal',
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
        ...mapMutations(['RESET_REQ', 'MODAL_OPENED']),
        closeModal() {
            if (this.closeOnClick) {
                this.emitClose();
            }
        },
        emitClose() {
            EventBus.$emit('MODAL_CLOSED');
            this.MODAL_OPENED(false);
            this.$emit('close');
            this.RESET_REQ();
        }
    },
    mounted() {
        this.MODAL_OPENED(true);
    }
};
</script>

<style lang="scss" scoped></style>
