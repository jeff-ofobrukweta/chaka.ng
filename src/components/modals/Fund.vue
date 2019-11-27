<template>
    <modal :close-on-click="false" @close="closeModal">
        <template slot="header">Account Funding</template>
        <form class="modal-form" @submit.prevent="fundWallet">
            <div class="modal-form__group">
                <label class="form__label" ref="input"
                    >Amount
                    <form-input
                        type="number"
                        name="amount"
                        v-model="itemData.amount"
                        placeholder="Amount"
                /></label>
            </div>
            <div class="modal-form__buttons">
                <action-button
                    type="submit"
                    :pending="loading"
                    :classes="['btn-block', 'btn__primary']"
                    >Fund</action-button
                >
            </div>
        </form>

        <section>
            <p>
                You're now requesting a funds transfer
                <span v-if="itemData.amount"
                    >of <span class="green">{{ itemData.amount | currency("NGN") }}</span></span
                >
                into your wallet
            </p>
            <p>
                Total amount to be debited (including PAYSTACK fees)
                <span class="green">{{ paystackValue | currency("NGN") }}</span>
            </p>
            <p class="grey-dark">Allow up to 1 business day</p>
            <br />
            <p>To fund your account manually (without PAYSTACK fees), make a transfer to:</p>
            <p><span class="grey-dark">Account Holder:&nbsp;</span>Citi Investment Capital</p>
            <p><span class="grey-dark">Bank Name:&nbsp;</span>GTBank</p>
            <p><span class="grey-dark">Account Number:&nbsp;</span>0467937290</p>
            <br />
            <p>
                <small class="grey-dark">
                    Please put your Chaka ID (in the Accounts section) in the Comments section of
                    your transfer request. Email
                    <a class="link" href="mailto:payments@chaka.ng">payments@chaka.ng</a> after
                    completion to confirm manual transfer</small
                >
            </p>
        </section>
    </modal>
</template>

<script>
export default {
    name: "fund-modal",
    data() {
        return {
            itemData: {},
            loading: false
        };
    },
    computed: {
        paystackValue() {
            if (!this.itemData.amount) return 0;
            if (this.itemData.amount > 2500) {
                return (+this.itemData.amount + 100) / (1 - 0.015);
            }
            return +this.itemData.amount / (1 - 0.015);
        }
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        fundWallet() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                console.log(this.itemData);
            }, 3000);
        }
    },
    mounted() {
        this.$refs.input.focus();
    }
};
</script>
