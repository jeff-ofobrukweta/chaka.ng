<template>
    <modal :close-on-click="false" @close="closeModal">
        <template slot="header">Funds Withdrawal</template>
        <form class="modal-form" @submit.prevent="fundWallet">
            <div class="modal-form__group">
                <label class="form__label"
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
                >&nbsp;into your United Bank For Africa account.
            </p>
            <br />
        </section>
    </modal>
</template>

<script>
export default {
    name: "withdraw-modal",
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
                return (this.itemData.amount + 100) / (1 - 0.015);
            }
            return this.itemData.amount / (1 - 0.015);
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
    }
};
</script>
