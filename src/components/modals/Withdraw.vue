<template>
    <modal :close-on-click="false" @close="closeModal">
        <template slot="header">Funds Withdrawal</template>
        <form class="modal-form" @submit.prevent="withdraw">
            <div class="modal-form__group">
                <label class="form__label"
                    >Amount<currency-input
                        currency="NGN"
                        placeholder="Enter Amount"
                        v-model="itemData.amount"
                        :error-message="errors.amount"
                        @reset="errors = {}"
                /></label>
                <div class="form-info">
                    <small>**Allow up to 1 business day</small>
                </div>
            </div>
            <error-block type="withdraw" />
            <div class="modal-form__buttons">
                <action-button
                    type="submit"
                    :disabled="Object.keys(errors).length > 0"
                    :pending="loading"
                    :classes="['btn-block', 'btn__primary']"
                    >Withdraw</action-button
                >
            </div>
        </form>

        <section>
            <br />
            <p class=" grey-cool">
                <small>
                    You're now requesting a withdrawal
                    <span v-if="itemData.amount"
                        >of <span class="green">{{ itemData.amount | currency("NGN") }}</span></span
                    >&nbsp;into your {{ getKYC.bankAcctNo || "" }}
                    {{
                        getKYC.bankAcctName ? `account with ${getKYC.bankAcctName}` : "bank"
                    }}</small
                >
            </p>
            <br />
        </section>
    </modal>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import CurrencyInput from '../form/CurrencyInput';

export default {
    name: 'withdraw-modal',
    components: {
        CurrencyInput
    },
    data() {
        return {
            itemData: {},
            loading: false,
            errors: {}
        };
    },
    computed: {
        ...mapGetters(['getKYC'])
    },
    methods: {
        ...mapActions(['WITHDRAW_WALLET']),
        ...mapMutations(['RESET_REQ']),
        closeModal() {
            this.$emit('close');
        },
        withdraw() {
            if (!this.itemData.amount) {
                this.$set(this.errors, 'amount', 'Amount is required');
                return false;
            }
            if (typeof +this.itemData.amount !== 'number') {
                this.$set(this.errors, 'amount', 'Invalid number input');
                return false;
            }
            if (+this.itemData.amount < 1000) {
                this.$set(this.errors, 'amount', 'Minimum withdrawal amount is ₦1000');
                return false;
            }
            this.loading = true;
            const payload = { ...this.itemData };
            payload.amount *= 100;
            this.WITHDRAW_WALLET(payload).then((resp) => {
                this.loading = false;
                if (resp) {
                    /**
                     * close buy modal
                     * show success modal
                     */
                    this.$emit('close', true);
                }
            });
        }
    },
    destroyed() {
        this.RESET_REQ();
    }
};
</script>
