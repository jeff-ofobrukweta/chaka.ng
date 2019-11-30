<template>
    <button :disabled="disabled" class="btn action" :class="[classes]" @click="handleClick($event)">
        <slot></slot>
    </button>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "check-kyc",
    props: {
        action: {
            type: String,
            required: true
        },
        classes: {
            type: Array,
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
    computed: {
        ...mapGetters(["getNextKYC"])
    },
    data() {
        return {
            clicked: this.pending
        };
    },
    methods: {
        ...mapActions(["GET_NEXT_KYC"]),
        handleClick(e) {
            this.clicked = true;
            if (this.action === "fund") {
                this.GET_NEXT_KYC({ context: "FUND" }).then(() => {
                    if (this.getNextKYC.status === "INCOMPLETE") {
                        this.$emit("step", { type: "fund", kyc: true });
                        return true;
                    } else if (this.getNextKYC.status === "COMPLETE") {
                        this.$emit("step", { type: "fund", kyc: false });
                        return true;
                    }
                });
            } else if (this.action === "local") {
                this.GET_NEXT_KYC({ context: "LOCAL" }).then(() => {
                    if (this.getNextKYC.status === "INCOMPLETE") {
                        this.$emit("step", { type: "local", kyc: true });
                        return true;
                    } else if (this.getNextKYC.status === "COMPLETE") {
                        this.$emit("step", { type: "local", kyc: false });
                        return true;
                    }
                });
            } else if (this.action === "global") {
                this.GET_NEXT_KYC({ context: "GLOBAL" }).then(() => {
                    if (this.getNextKYC.status === "INCOMPLETE") {
                        this.$emit("step", { type: "global", kyc: true });
                        return true;
                    } else if (this.getNextKYC.status === "COMPLETE") {
                        this.$emit("step", { type: "global", kyc: false });
                        return true;
                    }
                });
            } else {
                this.GET_NEXT_KYC().then(() => {
                    if (this.getNextKYC.status === "INCOMPLETE") {
                        this.$emit("step", "kyc");
                        return true;
                    }
                    this.$emit("step");
                });
            }
        }
    }
};
</script>
