<template>
    <Fragment>
        <Navbar />
        <main role="main">
            <transition name="kyc-navbar" v-if="showPending">
                <KYCPending />
            </transition>
            <transition name="kyc-navbar" v-else>
                <KYC v-if="showNavbarKYC" />
            </transition>
            <section class="container">
                <router-view />
            </section>
        </main>
        <buy-modal
            @close="closeBuy"
            :currency="getBuyModal.instrument.currency"
            :instrument="getBuyModal.instrument"
            :stock-page="getBuyModal.stockPage"
            v-if="getBuyModal.show"
        />
        <sell-modal
            @close="closeSell"
            :currency="getSellModal.instrument.currency"
            :instrument="getSellModal.instrument"
            :max-quantity="getSellModal.maxQuantity"
            :stock-page="getSellModal.stockPage"
            v-if="getSellModal.show"
        />
        <sale-success @close="closeSale" v-if="getSaleSuccess" />
        <fund-modal @close="closeFund" v-if="getFundModal" />
        <ExchangeModal @close="closeExchange" v-if="getExchangeModal" />
        <WithdrawModal @close="closeWithdraw" v-if="getWithdrawModal" />
        <wallet-success @close="closeWallet" v-if="getWalletSuccess" />
    </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'dashboard-layout',
    components: {
        Navbar: () => import('../components/Navbar'),
        KYC: () => import('../components/kyc/NavbarKYC'),
        KYCPending: () => import('../components/kyc/NavbarKYCPending'),
        ExchangeModal: () => import('../components/modals/Exchange'),
        WithdrawModal: () => import('../components/modals/Withdraw'),
        Fragment
    },
    computed: {
        ...mapGetters([
            'showNavbarKYC',
            'getLoggedUser',
            'getNavbarNextKYC',
            'getBuyModal',
            'getSellModal',
            'getKycModal',
            'getFundModal',
            'getWithdrawModal',
            'getExchangeModal',
            'getWalletSuccess',
            'getSaleSuccess'
        ]),
        showPending() {
            if (
                this.getNavbarNextKYC.status === 'COMPLETE'
                && (this.getLoggedUser.localKycStatus !== 'COMPLETE'
                    || this.getLoggedUser.globalKycStatus !== 'COMPLETE')
            ) return true;
            return false;
        }
    },
    methods: {
        ...mapActions(['GET_LOGGED_USER', 'GET_NEXT_KYC', 'GET_ACCOUNT_SUMMARY']),
        ...mapMutations([
            'SET_BUY_MODAL',
            'SET_SELL_MODAL',
            'SET_FUND_MODAL',
            'SET_EXCHANGE_MODAL',
            'SET_WITHDRAW_MODAL',
            'SET_KYC_MODAL',
            'SET_SALE_SUCCESS',
            'SET_WALLET_SUCCESS',
            'RESET_MODALS'
        ]),
        closeBuy(e) {
            this.SET_SELL_MODAL({});
            this.SET_BUY_MODAL({});
            if (e) {
                this.SET_SALE_SUCCESS(true);
            }
        },
        closeSell(e) {
            this.SET_BUY_MODAL({});
            this.SET_SELL_MODAL({});
            if (e) {
                this.SET_SALE_SUCCESS(true);
            }
        },
        closeSale() {
            this.SET_SALE_SUCCESS(false);
        },
        closeFund(e) {
            this.SET_FUND_MODAL(false);
            if (e) {
                this.SET_WALLET_SUCCESS(true);
            }
        },
        closeWithdraw(e) {
            this.SET_WITHDRAW_MODAL(false);
            if (e) {
                this.SET_WALLET_SUCCESS(true);
            }
        },
        closeExchange(e) {
            this.SET_EXCHANGE_MODAL(false);
            if (e) {
                this.SET_WALLET_SUCCESS(true);
            }
        },
        closeWallet() {
            this.SET_WALLET_SUCCESS(false);
        }
    },
    mounted() {
        document.title = 'Chaka - Dashboard';
        // this.RESET_MODALS();
        this.GET_LOGGED_USER().then(async () => {
            Promise.all([this.GET_ACCOUNT_SUMMARY(), this.GET_NEXT_KYC()]);
        });
    }
};
</script>
