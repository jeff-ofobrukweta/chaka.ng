<template>
    <div>
        <section class="accounts__title">
            <h3>Wallets</h3>
        </section>
        <section class="accounts-wallet">
            <div class="accounts-wallet__value">
                <div>
                    <div><img src="../../../assets/img/portfolio1-dark.svg" alt="Wallet" /></div>
                    <h2 class="cursor-context" :title="13422444.01 | currency('NGN', true)">
                        {{ 13422444.01 | currency("NGN") }}
                    </h2>
                    <p><small>My Portfolio Value</small></p>
                    <div class="accounts-wallet__graphics">
                        <img src="../../../assets/img/wallet1.svg" alt="Wallet" />
                        <img src="../../../assets/img/wallet2.svg" alt="Wallet" />
                    </div>
                </div>
            </div>
            <div class="accounts-wallet__text">
                <div class="accounts-wallet__currency">
                    <h3>Local</h3>
                    <hr />
                    <div class="accounts-wallet__money">
                        <div>
                            <h3 class="cursor-context" :title="2243.99 | currency('NGN', true)">
                                {{ 2243.99 | currency("NGN") }}
                            </h3>
                            <p><small>Available Cash</small></p>
                        </div>
                        <div>
                            <h3 class="cursor-context" :title="2243.99 | currency('NGN', true)">
                                {{ 2243.99 | currency("NGN") }}
                            </h3>
                            <p><small>Pending Cash</small></p>
                        </div>
                        <div>
                            <h3 class="cursor-context" :title="2243.99 | currency('NGN', true)">
                                {{ 2243.99 | currency("NGN") }}
                            </h3>
                            <p><small>Stock Value</small></p>
                        </div>
                    </div>
                </div>
                <div class="accounts-wallet__currency">
                    <h3>Global</h3>
                    <hr />
                    <div class="accounts-wallet__money">
                        <div>
                            <h3 class="cursor-context" :title="2243.99 | currency('USD', true)">
                                {{ 2243.99 | currency("USD") }}
                            </h3>
                            <p><small>Available Cash</small></p>
                        </div>
                        <div>
                            <h3 class="cursor-context" :title="2243.99 | currency('USD', true)">
                                {{ 2243.99 | currency("USD") }}
                            </h3>
                            <p><small>Pending Cash</small></p>
                        </div>
                        <div>
                            <h3 class="cursor-context" :title="2243.99 | currency('USD', true)">
                                {{ 2243.99 | currency("USD") }}
                            </h3>
                            <p><small>Stock Value</small></p>
                        </div>
                    </div>
                </div>
                <div class="accounts-wallet__buttons">
                    <action-button
                        :pending="fundClick"
                        @click="fund"
                        :classes="['btn-block', 'btn--lg', 'btn__primary']"
                        >Fund</action-button
                    >
                    <action-button
                        :pending="exchangeClick"
                        @click="exchange"
                        :classes="['btn-block', 'btn--lg', 'btn__primary--dark']"
                        >Exchange</action-button
                    >
                    <action-button
                        :pending="withdrawClick"
                        @click="withdraw"
                        :classes="['btn-block', 'btn--lg', 'btn__primary--outline']"
                        >Withdraw</action-button
                    >
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "accounts-wallet",
    data() {
        return {
            fundClick: false,
            exchangeClick: false,
            withdrawClick: false
        };
    },
    methods: {
        fund() {
            this.fundClick = true;
            setTimeout(() => {
                this.fundClick = false;
            }, 5000);
        },
        exchange() {
            this.exchangeClick = true;
            setTimeout(() => {
                this.exchangeClick = false;
            }, 5000);
        },
        withdraw() {
            this.withdrawClick = true;
            setTimeout(() => {
                this.withdrawClick = false;
            }, 5000);
        }
    }
};
</script>
