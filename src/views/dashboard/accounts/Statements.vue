<template>
    <div>
        <section class="accounts__title">
            <h3>History</h3>
            <select class="form__input" @change="marketChange" v-model="market">
                <option v-for="(option, i) in markets" :key="i" :value="option.value">{{
                    option.name
                }}</option>
            </select>
        </section>
        <section class="accounts-statements__all">
            <button
                class="btn btn-block"
                v-for="(button, index) in reportTypes"
                :key="index"
                @click="handleButtonChange(button.value)"
                :class="{ active: reportType === button.value }"
            >
                {{ button.name }}
            </button>
        </section>
        <section class="accounts-statements__date">
            <input
                class="form__input"
                type="date"
                name="start"
                @input="handleDate($event)"
                v-model="fromDate"
            />to
            <input
                class="form__input"
                type="date"
                name="start"
                @input="handleDate($event)"
                v-model="toDate"
            />
        </section>

        <section class="accounts-statements__downloads" v-if="loading">
            Loading...
        </section>

        <section class="accounts-statements__downloads" v-else-if="getStatements.length > 0">
            <StatementsCard
                v-for="(statement, i) in getStatements"
                :key="i"
                :statement="statement"
            />
        </section>

        <section v-else>You have no statements at the moment</section>
    </div>
</template>

<script>
import StatementsCard from "../../../components/accounts/StatementsCard";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
    name: "accounts-statements",
    components: {
        StatementsCard
    },
    data() {
        return {
            payload: {
                fromDate: null,
                toDate: null,
                market: "GLOBAL"
            },
            loading: true,
            market: "GLOBAL",
            reportType: "STATEMENT",
            selectedOrderCurrency: null,
            fromDate: null,
            toDate: null,
            markets: [
                {
                    name: "Local",
                    value: "LOCAL"
                },
                {
                    name: "Global",
                    value: "GLOBAL"
                }
            ],
            reportTypes: [
                {
                    name: "Statement",
                    value: "STATEMENT"
                },
                {
                    name: "Confirmations",
                    value: "CONFIRMATIONS"
                },
                {
                    name: "Tax",
                    value: "TAX"
                }
            ]
        };
    },
    computed: {
        ...mapGetters(["getStatements"])
    },
    methods: {
        ...mapActions(["GET_STATEMENTS"]),
        ...mapMutations(["SET_STATEMENTS"]),
        handleDate(e) {
            if (e.target.value) {
                this.payload.fromDate = new Date(this.fromDate).toISOString();
                this.payload.toDate = new Date(this.toDate).toISOString();
                this.fetchStatements();
            }
        },
        marketChange() {
            this.payload.market = this.market;
            this.fetchStatements();
        },
        handleButtonChange(value) {
            this.reportType = value;
            this.payload.reportType = value;
            this.fetchStatements();
        },
        fetchStatements() {
            this.loading = true;
            this.SET_STATEMENTS([]);
            this.GET_STATEMENTS(this.payload).then(() => {
                this.loading = false;
            });
        }
    },
    async mounted() {
        const date = new Date();
        const fromTemp = date.setDate(date.getDate() - 30);
        const toTemp = Date.now();
        this.payload.fromDate = new Date(fromTemp).toISOString();
        this.payload.toDate = new Date(toTemp).toISOString();
        this.fromDate = this.$options.filters.reverseDate(this.payload.fromDate);
        this.toDate = this.$options.filters.reverseDate(this.payload.toDate);
        await this.GET_STATEMENTS(this.payload);
        this.loading = false;
    }
};
</script>
