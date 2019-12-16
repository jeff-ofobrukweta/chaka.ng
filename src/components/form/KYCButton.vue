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
import EventBus from '../../event-bus';

export default {
    name: 'check-kyc',
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
        },
        tag: {
            type: String,
            default: 'button'
        },
        nextAction: {
            type: String
        }
    },
    computed: {
        ...mapGetters(['getNextKYC', 'getLoggedUser'])
    },
    data() {
        return {
            clicked: false
        };
    },
    methods: {
        ...mapActions(['GET_NEXT_KYC']),
        handleClick(e) {
            this.clicked = true;
            if (this.action === 'fund') {
                if (
                    this.getLoggedUser.localKycStatus !== 'NONE'
                    && this.getLoggedUser.globalKycStatus !== 'NONE'
                ) {
                    this.$emit('step', { type: 'fund', kyc: false });
                    this.clicked = false;
                    return true;
                }
                this.GET_NEXT_KYC({ context: 'FUND' }).then(() => {
                    if (this.getNextKYC.status === 'INCOMPLETE') {
                        this.$emit('step', { type: 'fund', kyc: true });
                        this.clicked = false;
                        return true;
                    } if (this.getNextKYC.status === 'COMPLETE') {
                        this.$emit('step', { type: 'fund', kyc: false });
                        this.clicked = false;
                        return true;
                    }
                });
            } else if (this.action === 'local') {
                if (this.getLoggedUser.localKycStatus !== 'NONE') {
                    this.$emit('step', {
                        type: 'local',
                        kyc: false,
                        nextAction: this.nextAction
                    });
                    this.clicked = false;
                    return true;
                }
                this.GET_NEXT_KYC({ context: 'LOCAL' }).then(() => {
                    if (this.getNextKYC.status === 'INCOMPLETE') {
                        this.$emit('step', { type: 'local', kyc: true });
                        this.clicked = false;
                        return true;
                    } if (this.getNextKYC.status === 'COMPLETE') {
                        this.$emit('step', {
                            type: 'local',
                            kyc: false,
                            nextAction: this.nextAction
                        });
                        this.clicked = false;
                        return true;
                    }
                });
            } else if (this.action === 'global') {
                if (this.getLoggedUser.globalKycStatus !== 'NONE') {
                    this.$emit('step', {
                        type: 'global',
                        kyc: false,
                        nextAction: this.nextAction
                    });
                    this.clicked = false;
                    return true;
                }
                this.GET_NEXT_KYC({ context: 'GLOBAL' }).then(() => {
                    if (this.getNextKYC.status === 'INCOMPLETE') {
                        this.$emit('step', { type: 'global', kyc: true });
                        this.clicked = false;
                        return true;
                    } if (this.getNextKYC.status === 'COMPLETE') {
                        this.$emit('step', {
                            type: 'global',
                            kyc: false,
                            nextAction: this.nextAction
                        });
                        this.clicked = false;
                        return true;
                    }
                });
            } else {
                this.GET_NEXT_KYC().then(() => {
                    if (this.getNextKYC.status === 'INCOMPLETE') {
                        this.$emit('step', 'kyc');
                        this.clicked = false;
                        return true;
                    }
                    this.$emit('step');
                    this.clicked = false;
                });
            }
        }
    },
    mounted() {
        EventBus.$on('MODAL_CLOSED', () => {
            this.clicked = false;
        });
    }
};
</script>
