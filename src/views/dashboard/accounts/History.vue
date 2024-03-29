<template>
    <div>
        <section class="accounts__title">
            <h3>History</h3>
            <div class="accounts__title--div">
                <section class="accounts-history__date" v-if="getWindowWidth !== 'mobile'">
                    <input class="form__input" type="date" name="start" @input="handleDate($event)" v-model="fromDate" />to
                    <input class="form__input" type="date" name="start" @input="handleDate($event)" v-model="toDate" />
                </section>
                <select class="form__input no-margin" @change="getHistory" v-model="selectedWallet">
                    <option v-for="(option, i) in walletPref" :key="i" :value="option.value">{{ option.name }}</option>
                </select>
            </div>
        </section>
        <section class="accounts-history__all">
            <button
                class="btn btn-block"
                v-for="(button, index) in actionTypes"
                :key="index"
                @click="handleButtonChange(button.value)"
                :class="{ active: selectedType === button.value }"
            >
                {{ button.name }}
            </button>
        </section>
        <section class="accounts-history__date" v-if="getWindowWidth === 'mobile'">
            <input class="form__input" type="date" name="start" @input="handleDate($event)" v-model="fromDate" />to
            <input class="form__input" type="date" name="start" @input="handleDate($event)" v-model="toDate" />
        </section>

        <section class="accounts-statements__downloads loader-gif__big" v-if="loading">
            <img :src="require('../../../assets/img/loader.gif')" alt="Loader" />
        </section>
        <div class="caution__big" v-else-if="getErrorLog.type === 'history' && getAccountHistory.length <= 0">
            <img :src="require('../../../assets/img/caution.svg')" alt="Caution" />
            <a class="caution__reload" @click="mount">Reload</a>
        </div>

        <HistoryTable :history="getAccountHistory" :type="selectedType" v-else-if="getAccountHistory.length > 0" />

        <section class="empty-center" v-else>
            <img width="80px" :src="require('../../../assets/img/papers.svg')" alt="Papers" />
            <p>There are no transactions available within the selected range</p>
        </section>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'accounts-history',
    components: {
        HistoryTable: () => import('../../../components/accounts/HistoryTable')
    },
    data() {
        return {
            payload: {
                fromDate: null,
                toDate: null,
                actionType: 'ALL',
                walletPref: 'ALL'
            },
            selectedType: 'ALL',
            selectedWallet: 'ALL',
            loading: false,
            fromDate: null,
            toDate: null,
            walletPref: [
                {
                    name: 'All',
                    value: 'ALL'
                },
                {
                    name: 'Local',
                    value: 'LOCAL'
                },
                {
                    name: 'Global',
                    value: 'GLOBAL'
                }
            ],
            actionTypes: [
                {
                    name: 'All',
                    value: 'ALL'
                },
                {
                    name: 'Order',
                    value: 'ORDER'
                },
                {
                    name: 'Withdrawal',
                    value: 'DEBIT'
                },
                // {
                //     name: 'Transfer',
                //     value: 'TRANSFER'
                // },
                {
                    name: 'Deposit',
                    value: 'CREDIT'
                }
            ]
        };
    },
    computed: {
        ...mapGetters(['getAccountHistory', 'getErrorLog', 'getWindowWidth'])
    },
    methods: {
        ...mapActions(['GET_ACCOUNT_HISTORY', 'GET_ORDERS_HISTORY']),
        ...mapMutations(['SET_ACCOUNT_HISTORY']),
        handleDate(e) {
            if (e.target.value) {
                this.payload.fromDate = new Date(this.fromDate).toISOString();
                this.payload.toDate = new Date(this.toDate).toISOString();
                this.orderHistoryCheck();
            }
        },
        getHistory() {
            this.payload.walletPref = this.selectedWallet;
            this.orderHistoryCheck();
        },
        handleButtonChange(value) {
            this.selectedType = value;
            this.orderHistoryCheck();
        },
        async orderHistoryCheck() {
            this.loading = true;
            this.SET_ACCOUNT_HISTORY([]);
            this.payload.actionType = this.selectedType;
            await this.GET_ACCOUNT_HISTORY(this.payload);
            this.loading = false;
        },
        async mount() {
            this.loading = true;
            try {
                const date = new Date();
                const fromTemp = date.setDate(date.getDate() - 30);
                const toTemp = Date.now();
                this.payload.fromDate = new Date(fromTemp).toISOString();
                this.payload.toDate = new Date(toTemp).toISOString();
                this.fromDate = this.$options.filters.reverseDate(this.payload.fromDate);
                this.toDate = this.$options.filters.reverseDate(this.payload.toDate);
                await this.GET_ACCOUNT_HISTORY(this.payload);
                this.loading = false;
            } catch (err) {
                this.loading = false;
            }
        }
    },
    async mounted() {
        await this.mount();
    }
};
</script>
