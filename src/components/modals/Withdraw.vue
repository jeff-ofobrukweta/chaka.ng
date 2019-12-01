<template>
    <modal :close-on-click="false" @close="closeModal">
        <template slot="header">Funds Withdrawal</template>
        <form class="modal-form" @submit.prevent="withdraw">
            <div class="modal-form__group">
                <label class="form__label"
                    >Amount
                    <form-input
                        type="number"
                        name="amount"
                        v-model="itemData.amount"
                        placeholder="Amount"
                        :error-message="errors.amount"
                /></label>
            </div>
            <error-block type="withdraw" :message="message" :status="status" @reset="handleReset" />
            <div class="modal-form__buttons">
                <action-button
                    type="submit"
                    :disabled="!itemData.amount"
                    :pending="loading"
                    :classes="['btn-block', 'btn__primary']"
                    >Withdraw</action-button
                >
            </div>
        </form>

        <section>
            <p class="grey-dark">Allow up to 1 business day</p>
            <br />
            <p>
                You're now requesting a withdrawal
                <span v-if="itemData.amount"
                    >of <span class="green">{{ itemData.amount | currency("NGN") }}</span></span
                >&nbsp;into your {{ getKYC.bankAcctName || "bank" }}
            </p>
            <br />
        </section>
    </modal>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
// import withdrawValidation from "../../services/validations/wallet";
export default {
    name: "withdraw-modal",
    data() {
        return {
            itemData: {},
            loading: false,
            message: null,
            status: null
        };
    },
    computed: {
        ...mapGetters(["getKYC"])
    },
    methods: {
        ...mapActions(["WITHDRAW_WALLET"]),
        ...mapMutations(["RESET_REQ"]),
        closeModal() {
            this.$emit("close");
        },
        withdraw() {
            // this.validate(this.itemData, withdrawValidation.withdraw);
            if (Object.keys(this.errors).length > 0) {
                return false;
            }
            if (this.itemData.amount) {
                this.loading = true;
                let payload = { ...this.itemData };
                payload.amount *= 100;
                this.WITHDRAW_WALLET(payload).then(resp => {
                    this.loading = false;
                    if (resp) {
                        /**
                         * close buy modal
                         * show success modal
                         */
                        this.$emit("close", true);
                    }
                });
            }
        },
        handleReset() {
            this.message = null;
            this.status = null;
        }
    },
    destroyed() {
        this.RESET_REQ();
    }
};
</script>
