<template>
    <Fragment>
        <Navbar />
        <template v-if="!loading && showKYC">
            <transition name="kyc-navbar" v-if="showPending">
                <div>
                    <KYC />
                    <KYCPending />
                </div>
            </transition>
            <transition name="kyc-navbar" v-else-if="showNavbarKYC">
                <KYC />
            </transition>
            <transition name="kyc-navbar" v-else>
                <section class="kyc-nav__section" @click="SET_SHOW_NAVBAR_KYC(true)">
                    <p class="kyc-nav__continue">
                        Continue Verification
                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="#fff" />
                        </svg>
                    </p>
                </section>
            </transition>
        </template>
        <div v-if="isSearchOpened" class="search-overlay" @click="SEARCH_OPENED(false)"></div>
        <main class="dashboard-loader" v-if="loading || isComponentLoader">
            <img :src="require('../assets/img/loader.gif')" alt="Loader" />
        </main>
        <main role="main" v-else>
            <section class="container">
                <router-view />
            </section>
        </main>
        <BuyModal @close="closeBuy" v-if="getBuyModal.show" />
        <SellModal @close="closeSell" v-if="getSellModal.show" />
        <SaleSuccess @close="closeSale" v-if="getSaleSuccess" />
        <FundModal @close="closeFund" v-if="getFundModal" />
        <ExchangeModal @close="closeExchange" v-if="getExchangeModal" />
        <WithdrawModal @close="closeWithdraw" v-if="getWithdrawModal" />
        <WalletSuccess @close="closeWallet" v-if="getWalletSuccess" />
        <DownloadApp @close="closeDownloadApp" v-if="getDownloadApp" />
    </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
    name: "dashboard-layout",
    components: {
        Navbar: () => import("../components/Navbar"),
        KYC: () => import("../components/kyc/NavbarKYC"),
        KYCPending: () => import("../components/kyc/NavbarKYCPending"),
        ExchangeModal: () => import("../components/modals/Exchange"),
        WithdrawModal: () => import("../components/modals/Withdraw"),
        BuyModal: () => import("../components/modals/Buy"),
        SellModal: () => import("../components/modals/Sell"),
        SaleSuccess: () => import("../components/modals/SaleSuccess"),
        FundModal: () => import("../components/modals/Fund"),
        WalletSuccess: () => import("../components/modals/WalletSuccess"),
        DownloadApp: () => import("../components/modals/DownloadApp"),
        Fragment
    },
    data() {
        return {
            loading: true
        };
    },
    computed: {
        ...mapGetters([
            "showNavbarKYC",
            "getLoggedUser",
            "getNavbarNextKYC",
            "getBuyModal",
            "getSellModal",
            "getFundModal",
            "getWithdrawModal",
            "getExchangeModal",
            "getWalletSuccess",
            "getGiftSuccessModal",
            "getSaleSuccess",
            "getDownloadApp",
            "isSearchOpened",
            "isComponentLoader",
            "getWindowWidth"
        ]),
        showPending() {
            if (this.getNavbarNextKYC.status === "COMPLETE" && (this.getLoggedUser.localKycStatus !== "COMPLETE" || this.getLoggedUser.globalKycStatus !== "COMPLETE")) return true;
            return false;
        },
        showKYC() {
            return this.getLoggedUser.localKycStatus !== "COMPLETE" && this.getLoggedUser.globalKycStatus !== "COMPLETE";
        }
    },
    methods: {
        ...mapActions(["GET_LOGGED_USER", "GET_ACCOUNT_SUMMARY", "GET_KYC"]),
        ...mapMutations([
            "SET_BUY_MODAL",
            "SET_SELL_MODAL",
            "SET_FUND_MODAL",
            "SET_EXCHANGE_MODAL",
            "SET_WITHDRAW_MODAL",
            "SET_KYC_MODAL",
            "SET_SALE_SUCCESS",
            "SET_WALLET_SUCCESS",
            "SET_DOWNLOAD_APP",
            "RESET_MODALS",
            "SEARCH_OPENED",
            "MODAL_OPENED",
            "SET_SHOW_NAVBAR_KYC"
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
        },
        closeDownloadApp() {
            const showDownload = localStorage.getItem("downloadApp");
            const newValue = "" + showDownload[0] + 0;
            localStorage.setItem("downloadApp", newValue);
            this.SET_DOWNLOAD_APP(false);
        }
    },
    async mounted() {
        document.title = "Chaka - Dashboard";
        this.RESET_MODALS();
        this.SEARCH_OPENED(false);
        this.MODAL_OPENED(false);
        this.loading = true;
        try {
            await this.GET_LOGGED_USER();
            this.GET_KYC();
            this.loading = false;
            await this.GET_ACCOUNT_SUMMARY();
        } catch (err) {
            this.loading = false;
            this.$router.push({ name: "logout" });
        }

        // Check if device is mobile
        if (this.getWindowWidth === "mobile") {
            // Get day to show download app modal
            const date = new Date();
            const downloadDay = date.getDay() + 1;
            const showDownload = localStorage.getItem("downloadApp");

            // Get user device OS
            const userAgent = navigator.userAgent.toLowerCase();
            var isAndroid = userAgent.indexOf("android") > -1;

            if (!showDownload) {
                const temp = "" + downloadDay + 1;
                localStorage.setItem("downloadApp", temp);
                setTimeout(() => {
                    this.SET_DOWNLOAD_APP(true);
                }, 3000);
            } else {
                if (+showDownload[0] === downloadDay && +showDownload[1] === 1) {
                    setTimeout(() => {
                        this.SET_DOWNLOAD_APP(true);
                    }, 3000);
                }
            }
        }
    },
    watch: {
        showPending(val) {
            if (val) {
                this.MODAL_OPENED(false);
            }
        }
    }
};
</script>
