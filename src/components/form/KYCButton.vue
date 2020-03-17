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
import { mapGetters, mapActions, mapMutations } from 'vuex';
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
        ...mapGetters(['getNextKYC', 'getNavbarNextKYC', 'getLoggedUser', 'getKYC'])
    },
    data() {
        return {
            clicked: false
        };
    },
    methods: {
        ...mapActions(['GET_NEXT_KYC', 'GET_NEXT_NAVABR_KYC']),
        ...mapMutations(['SET_KYC_MODAL_ACTION']),
        handleClick(e) {
            if (!this.clicked) {
                this.clicked = true;
                this.SET_KYC_MODAL_ACTION(this.action.toUpperCase());

                if (this.action === 'withdraw') {
                    if (
                        this.getKYC.bvnFetchStatus
                        && this.getKYC.bankAcctName
                        && this.getKYC.bankAcctNo
                    ) {
                        this.$emit('step', { type: 'withdraw', kyc: false });
                        this.clicked = false;
                        return true;
                    }
                    this.GET_NEXT_KYC().then(() => {
                        if (this.getNextKYC.status === 'INCOMPLETE') {
                            this.$emit('step', { type: 'withdraw', kyc: true });
                            this.clicked = false;
                            return true;
                        }
                        if (this.getNextKYC.status === 'COMPLETE') {
                            this.$emit('step', { type: 'withdraw', kyc: false });
                            this.clicked = false;
                            return true;
                        }
                        this.clicked = false;
                        return true;
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
                    this.GET_NEXT_KYC().then(() => {
                        if (this.getNextKYC.status === 'INCOMPLETE') {
                            this.$emit('step', { type: 'local', kyc: true });
                            this.clicked = false;
                            return true;
                        }
                        if (this.getNextKYC.status === 'COMPLETE') {
                            this.$emit('step', {
                                type: 'local',
                                kyc: false,
                                nextAction: this.nextAction
                            });
                            this.clicked = false;
                            return true;
                        }
                        this.clicked = false;
                        return true;
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
                    this.GET_NEXT_KYC().then(() => {
                        if (this.getNextKYC.status === 'INCOMPLETE') {
                            this.$emit('step', { type: 'global', kyc: true });
                            this.clicked = false;
                            return true;
                        }
                        if (this.getNextKYC.status === 'COMPLETE') {
                            this.$emit('step', {
                                type: 'global',
                                kyc: false,
                                nextAction: this.nextAction
                            });
                            this.clicked = false;
                            return true;
                        }
                        this.clicked = false;
                        return true;
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
        }
    },
    mounted() {
        EventBus.$on('MODAL_CLOSED', () => {
            this.clicked = false;
        });
    }
};
</script>
