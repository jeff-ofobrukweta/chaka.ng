import API_CONTEXT from "../../services/apiService/api";
import filters from "../../filters";

const state = {
    singlestockpricedata: [],
    singlestockdate: [],
    positionweightdate: [],
    positionweightprice: [],
    positionperformancesymbol: [],
    positionperformancepercentage: [],
    portfoliodate: [],
    portfolioprice: [],
    pricedetailsvariable: {},
    actionperformance: [],
    valueperformance: [],
    actionanalysis: [],
    valueanalysis: [],
    portfolioDerivedPrice: null,
    portfolioDerivedChange: null,
    globalCurrencyforportfolioGraph: "NGN",
    globalTimeforportfolioGraph: "1W",
    // portfolioposition:0,

    globalCurrencyforsinglestockGraph: "NGN",
    globalTmeforsinglestockGraph: "5Y",
    singlestockposition: 0
};

const getters = {
    getPorfolioglobalTimeforGraph: state => state.globalTimeforportfolioGraph,
    getPorfolioglobalCurrencyforGraph: state => state.globalCurrencyforportfolioGraph,
    // getPortfolioIntervalposition: state => {
    //     return state.portfolioposition;
    // },

    // start single stock getter global variables here
    getSinglestockglobalTimeforGraph: state => state.globalTmeforsinglestockGraph,
    getSinglestockglobalCurrencyforGraph: state => state.globalCurrencyforsinglestockGraph,
    getSinglestockIntervalposition: state => state.singlestockposition,
    // end the single-stock variable here

    getPortfolioDerivedPrice: state => state.portfolioDerivedPrice,
    getPortfolioDerivedChange: state => state.portfolioDerivedChange,

    getOpenPrice: state => {
        if (state.singlestockpricedata) {
            return state.singlestockpricedata.map(data => data.price);
        }
        return state.singlestockpricedata;
    },
    getDates: state => {
        if (state.singlestockdate) {
            return state.singlestockdate.map(data => filters.resolveDate(data.date));
        }
        return state.singlestockdate;
    },
    gethistoryportfolioprice: state => {
        if (state.portfolioprice) {
            return state.portfolioprice.map(data => data.netWorth);
        }
        return state.portfolioprice;
    },
    gethistoryportfoliodate: state =>
        state.portfoliodate.map(data => {
            if (data.date === 0) return null;
            if (state.globalTimeforportfolioGraph === "1D") {
                return filters.resolveTime(data.date);
            }
            return filters.resolveDate(data.date);
        }),
    getDoughnutWeightpercentage: state => state.positionweightprice.map(data => data.percentChange),
    getDoughnutWeightsymbol: state => {
        if (state.positionweightdate) {
            return state.positionweightdate.map(data => data.symbol);
        }
        return state.positionweightdate;
    },
    getPositionBarperformancesymbol: state => {
        if (state.positionperformancesymbol) {
            return state.positionperformancesymbol.map(data => data.symbol);
        }
        return state.positionperformancesymbol;
    },

    getPositionBarperformancepercentage: state => {
        if (state.positionperformancepercentage) {
            return state.positionperformancepercentage.map(data => data.percentChange);
        }
        return state.positionperformancepercentage;
    },
    // blue board on single-stock graph
    getPricedetailsonblackcard: state => state.pricedetailsvariable,
    getActionperformance: state => state.actionperformance.map(data => data.action),
    getValueperformance: state => state.valueperformance.map(data => data.value),
    getActionanalysis: state => state.actionanalysis.map(data => data.action),
    getValueanalysis: state => state.actionanalysis.map(data => data.value)
};

const mutations = {
    SET_PORTFOLIO_DERIVED_PRICE(state, derived) {
        state.portfolioDerivedPrice = derived;
    },

    SET_PORTFOLIO_DERIVED_CHANGE(state, change) {
        state.portfolioDerivedChange = change;
    },

    SET_LINE_SINGLESTOCK_CHARTDATA(state, prices) {
        let singlestockpricedata = [];
        singlestockpricedata = prices;
        state.singlestockpricedata = [...singlestockpricedata];
    },
    SET_LINE_SINGLESTOCK_CHART_DATE(state, date) {
        let singlestockdate = [];
        singlestockdate = date;
        state.singlestockdate = [...singlestockdate];
    },
    SET_LINE_PORTFOLIO_CHART_PRICE(state, prices) {
        let portfolioprice = [];
        portfolioprice = prices;
        state.portfolioprice = [...portfolioprice];
    },
    SET_LINE_PORTFOLIO_CHART_DATE(state, date) {
        let portfoliodate = [];
        portfoliodate = date;
        state.portfoliodate = [...portfoliodate];
    },

    SET_HORIZONTAL_PERFORMANCE_CHART_DATE(state, date) {
        let performancedate = [];
        performancedate = date;
        state.singlestockdate = [...performancedate];
    },
    SET_HORIZONTAL_PERFORMANCE_CHART_PRICE(state, price) {
        let performanceprice = [];
        performanceprice = price;
        state.performanceprice = [...performanceprice];
    },
    SET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATE(state, date) {
        let positionweightdate = [];
        positionweightdate = date;
        state.positionweightdate = [...positionweightdate];
    },
    SET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATA_PRICE(state, price) {
        let positionweightprice = [];
        positionweightprice = price;
        state.positionweightprice = [...positionweightprice];
    },
    SET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_PERCENTAGE(state, price) {
        let positionperformancepercentage = [];
        positionperformancepercentage = price;
        state.positionperformancepercentage = [...positionperformancepercentage];
    },
    SET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_SYMBOL(state, symbol) {
        let positionperformancesymbol = [];
        positionperformancesymbol = symbol;
        state.positionperformancesymbol = [...positionperformancesymbol];
    },
    SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_ACTION(state, action) {
        let actionperformance = [];
        actionperformance = action;
        state.actionperformance = actionperformance;
    },
    SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_VALUE(state, value) {
        let valueperformance = {};
        valueperformance = value;
        state.valueperformance = valueperformance;
    },
    SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_VALUE(state, action) {
        let actionanalysis = [];
        actionanalysis = action;
        state.actionanalysis = actionanalysis;
    },
    SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_ACTION(state, value) {
        let valueanalysis = {};
        valueanalysis = value;
        state.valueanalysis = valueanalysis;
    },
    SET_PRICE_INFO_ON_BLACKCARD(state, pricedetails) {
        let pricedetailsvariable = {};
        pricedetailsvariable = pricedetails;
        state.pricedetailsvariable = pricedetailsvariable;
    },
    // SET_PORTFOLIO_POSITIONS_FOR_SELECT(state, select) {
    //     state.portfolioposition = select;
    // },
    SET_GLOBALSTORE_PORTFOLIOHISTORY_INTERVAL_FOR_GRAPH(state, interval) {
        state.globalTimeforportfolioGraph = interval;
    },
    SET_GLOBALSTORE_PORTFOLIOHISTORY_CURRENCY_FOR_GRAPH(state, currency) {
        state.globalCurrencyforportfolioGraph = currency;
    },

    // start the global-single-stock variable here
    // singlestock global varaiable seeetters
    SET_SINGLESTOCK_POSITIONS_FOR_SELECT(state, select) {
        state.singlestockposition = select;
    },
    SET_GLOBALSTORE_SINGLESTOCKHISTORY_INTERVAL_FOR_GRAPH(state, interval) {
        state.globalTmeforsinglestockGraph = interval;
    },
    SET_GLOBALSTORE_SINGLESTOCKHISTORY_CURRENCY_FOR_GRAPH(state, currency) {
        state.globalCurrencyforsinglestockGraph = currency;
    }
};

const actions = {
    async GET_LINECHART_SINGLESTOCK_GRAPH_DATA({ commit }, params) {
        await API_CONTEXT.get("/instruments/charts", params)
            .then(response => {
                const {
                    chart,
                    derivedPrice,
                    derivedPricePercentage,
                    askPrice
                } = response.data.data;
                commit("SET_LINE_SINGLESTOCK_CHARTDATA", chart);
                commit("SET_LINE_SINGLESTOCK_CHART_DATE", chart);
                // derived prices high lows etc are gotton here
                commit("SET_PRICE_INFO_ON_BLACKCARD", response.data.data);
            })
            .catch(error => {});
    },
    async GET_LINECHART_PORTFOLIO_GRAPH_DATA({ commit, rootState }, params) {
        await API_CONTEXT.get(`users/${rootState.auth.loggedUser.chakaID}/positions-chart/`, params)
            .then(response => {
                const {
                    positions,
                    derivedNetWorth,
                    derivedNetWorthPercentage
                } = response.data.data;
                commit("SET_PORTFOLIO_DERIVED_PRICE", derivedNetWorth);
                commit("SET_PORTFOLIO_DERIVED_CHANGE", derivedNetWorthPercentage);

                commit("SET_LINE_PORTFOLIO_CHART_PRICE", positions);
                commit("SET_LINE_PORTFOLIO_CHART_DATE", positions);
            })
            .catch(error => {});
    },
    async GET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATA({ commit, rootState }) {
        await API_CONTEXT.get(`/users/${rootState.auth.loggedUser.chakaID}/positions-weight`)
            .then(response => {
                commit("SET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATE", response.data.data.chart);
                commit("SET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATA_PRICE", response.data.data.chart);
            })
            .catch(error => {});
    },
    async GET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_DATA({ commit, rootState }) {
        await API_CONTEXT.get(`/users/${rootState.auth.loggedUser.chakaID}/positions-performance/`)
            .then(response => {
                commit(
                    "SET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_PERCENTAGE",
                    response.data.data.chart
                );
                commit(
                    "SET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_SYMBOL",
                    response.data.data.chart
                );
            })
            .catch(error => {});
    },

    async GET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_DATA({ commit }, params) {
        await API_CONTEXT.get(`/instruments/performance?symbol=${params.symbol}`)
            .then(response => {
                const { performance } = response.data.data;
                commit("SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_ACTION", performance);
                commit("SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_VALUE", performance);
            })
            .catch(error => {});
    },
    async GET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_DATA({ commit }, params) {
        await API_CONTEXT.get(`/instruments/analyst-recommendations?symbol=${params.symbol}`)
            .then(response => {
                const { recommendations } = response.data.data;
                commit("SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_ACTION", recommendations);
                commit("SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_VALUE", recommendations);
            })
            .catch(error => {
                return false;
            });
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
