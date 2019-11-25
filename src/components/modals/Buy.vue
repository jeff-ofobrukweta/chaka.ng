<template>
    <modal :close-on-click="false" @close="closeModal" class="modal__buy">
        <template slot="header">Buy {{ instrument.name }}</template>
        <section class="modal__buy--details">
            <div class="modal__buy-left">
                <div class="modal__buy--image">
                    <img
                        class="modal__buy--img"
                        src="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    />
                </div>
                <div class="modal__buy--symbol">
                    <p>{{ instrument.symbol }}</p>
                    <p><img src="../../assets/img/flags/us-flag.svg" alt="US" /></p>
                </div>
            </div>
            <div>
                <p class="grey-cool"><small>CURRENCT STOCK PRICE</small></p>
                <p>
                    <span
                        class="cursor-context modal__buy--price"
                        :title="instrument.price | currency(instrument.currency, true)"
                        >{{ instrument.price | currency(instrument.currency) }}</span
                    >&nbsp;&nbsp;
                    <img
                        v-if="instrument.change >= 0"
                        src="../../assets/img/watchlist-up.svg"
                        alt="Growth"
                    />
                    <img v-else src="../../assets/img/watchlist-down.svg" alt="Growth" />
                    <span :class="[instrument.change >= 0 ? 'green' : 'red']">
                        <span>{{ instrument.change >= 0 ? "+" : "" }}</span>
                        <small
                            >{{ instrument.change | units(2) }} ({{
                                instrument.percent | units(2)
                            }}%)</small
                        ></span
                    >
                </p>
            </div>
            <div>
                <p class="grey-cool"><small>AVAILABLE AMOUNT</small></p>
                <p
                    class="cursor-context modal__buy--price"
                    :title="3445566 | currency(instrument.currency, true)"
                >
                    {{ 3445566 | currency(instrument.currency) }}
                </p>
            </div>
        </section>
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
    name: "buy-modal",
    props: {
        currency: {
            type: String,
            required: true
        },
        symbol: {
            type: String,
            required: true
        },
        instrument: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            itemData: {},
            loading: false
        };
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
