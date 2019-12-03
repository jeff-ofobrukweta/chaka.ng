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
                        @reset="issues = {}"
                        :error-message="issues.amount"
                /></label>
                <div class="form-info">
                    <small>**Allow up to 1 business day</small>
                </div>
            </div>
            <error-block type="withdraw" />
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
            <br />
            <p>
                You're now requesting a withdrawal
                <span v-if="itemData.amount"
                    >of <span class="green">{{ itemData.amount | currency("NGN") }}</span></span
                >&nbsp;into your
                {{ getKYC.bankAcctName ? `account with ${getKYC.bankAcctName}` : "bank" }}
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
            issues: {}
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
            if (typeof +this.itemData.amount !== "number") {
                this.$set(this.issues, "amount", "Invalid number input");
                return false;
            }
            if (+this.itemData.amount < 1000) {
                this.$set(this.issues, "amount", "Minimum withdrawal amount is ₦1000");
                return false;
            }
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
    destroyed() {
        this.RESET_REQ();
    }
};
</script>
