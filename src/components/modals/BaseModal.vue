<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal__underlay" @click="closeModal"></div>
            <div class="modal-wrapper">
                <div class="modal-container" :class="{ 'modal-container__full': fullOnMobile }">
                    <div class="modal-header" v-if="!noHeader">
                        <h4 class="modal-header__text"><slot name="header">Title</slot></h4>
                        <a @click="$emit('close')" class="modal-header__close"
                            ><svg
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="612px"
                                height="612px"
                                viewBox="0 0 612 612"
                                style="enable-background:new 0 0 612 612;"
                                xml:space="preserve"
                            >
                                <g>
                                    <g id="cross">
                                        <g>
                                            <polygon
                                                points="612,36.004 576.521,0.603 306,270.608 35.478,0.603 0,36.004 270.522,306.011 0,575.997 35.478,611.397 
				306,341.411 576.521,611.397 612,575.997 341.459,306.011 			"
                                            />
                                        </g>
                                    </g>
                                </g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g></svg
                        ></a>
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
import { mapMutations } from "vuex";
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
        ...mapMutations(["RESET_REQ"]),
        closeModal() {
            if (this.closeOnClick) {
                this.RESET_REQ();
                this.$emit("close");
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
