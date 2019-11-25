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
                    <button class="btn btn-block btn--lg btn__primary">Fund</button>
                    <button class="btn btn-block btn--lg btn__primary--dark">Exchange</button>
                    <button class="btn btn-block btn--lg btn__primary--outline">Withdraw</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "accounts-wallet"
};
</script>
