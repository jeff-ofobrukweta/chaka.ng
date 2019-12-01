import API_CONTEXT from '../../services/apiService/api';

const state = {
    singlestockpricedata:[],
    singlestockdate:[],
    positionweightdate:[],
    positionweightprice:[],
    positionperformancesymbol:[],
    positionperformancepercentage:[],
    portfoliodate:[],
    portfolioprice:[],
    pricedetailsvariable:{},
    actionperformance:[],
    valueperformance:[],
    actionanalysis:[],
    valueanalysis:[],
    portfolioDerivedPrice: null,
    portfolioDerivedChange: null,
    globalCurrencyforportfolioGraph:'NGN',
    globalTimeforportfolioGraph:'1D',
    portfolioposition:0


    
};

const getters = {



    getPorfolioglobalTimeforGraph: (state) => {
        return state.globalTimeforportfolioGraph;
    },
    getPorfolioglobalCurrencyforGraph: (state) => {
        return state.globalCurrencyforportfolioGraph;
    },
    getPortfolioIntervalposition:(state) => {
        return state.portfolioposition;
    },



    getPortfolioDerivedPrice: (state) => {
		return state.portfolioDerivedPrice;
	},
	getPortfolioDerivedChange: (state) => {
		return state.portfolioDerivedChange;
	},

    getOpenPrice: (state) => {
		return state.singlestockpricedata.map((data) => {
			return data.price;
		});
    },
    getDates: (state) => {
		return state.singlestockdate.map((data) => {
			return data.date;
		});
    },
    gethistoryportfolioprice: (state) => {
        return state.portfolioprice.map((data) => {
            return (data.netWorth);
        });
    },
    gethistoryportfoliodate: (state) => {
        return state.portfoliodate.map((data) => {
            return (data.date);
        });
    },
    getDoughnutWeightpercentage: (state) => {
		return state.positionweightprice.map((data) => {
			return (data.percentChange);
		});
    },
    getDoughnutWeightsymbol: (state) => {
		return state.positionweightdate.map((data) => {
			return(data.symbol);
		});
    },
    getPositionBarperformancesymbol: (state) => {
		return state.positionperformancesymbol.map((data) => {
			return(data.symbol);
		});
    },
    
    getPositionBarperformancepercentage: (state) => {
		return state.positionperformancepercentage.map((data) => {
			return(data.percentChange);
		});
    },
    // blue board on single-stock graph
    getPricedetailsonblackcard: (state) => {
			return state.pricedetailsvariable;
    },
    getActionperformance: (state) => {
		return state.actionperformance.map((data) => {
			return(data.action);
		});
    },
    getValueperformance: (state) => {
		return state.valueperformance.map((data) => {
			return(data.value);
		});
    },
    getActionanalysis: (state) => {
		return state.actionanalysis.map((data) => {
			return(data.action);
		});
    },
    getValueanalysis: (state) => {
		return state.actionanalysis.map((data) => {
			return(data.value);
		});
    },


};

const mutations = {
    SET_PORTFOLIO_POSITIONS_FOR_SELECT(state, derived) {
		state.portfolioposition = derived;
    },
    SET_PORTFOLIO_DERIVED_PRICE(state, derived) {
		state.portfolioDerivedPrice = derived;
	},

    SET_PORTFOLIO_DERIVED_CHANGE(state, change) {
		state.portfolioDerivedChange = change;
	},

    SET_LINE_SINGLESTOCK_CHARTDATA(state, prices) {
        console.log('>>>>>>>>>>>>>>>boom new>>>>//////////////',state.singlestockpricedata)
		let singlestockpricedata = [];
		singlestockpricedata = prices;
        state.singlestockpricedata = [...singlestockpricedata];
       
    },
    SET_LINE_SINGLESTOCK_CHART_DATE(state, date) {
        console.log('>>>>>>>>>>>>>>>boom new>>>>//////////////',state.singlestockdate)
		let singlestockdate = [];
		singlestockdate = date;
        state.singlestockdate = [...singlestockdate];
       
    },
    SET_LINE_PORTFOLIO_CHART_PRICE(state, prices) {
        console.log('>>>>>>>>>>>>>>>boom new>>>>//////////////',state.portfolioprice)
		let portfolioprice = [];
		portfolioprice = prices;
        state.portfolioprice = [...portfolioprice];
       
    },
    SET_LINE_PORTFOLIO_CHART_DATE(state, date) {
        console.log('>>>>>>>>>>>>>>>boom new>>>>//////////////',state.portfoliodate)
		let portfoliodate = [];
		portfoliodate = date;
        state.portfoliodate = [...portfoliodate];
    },
    
    SET_HORIZONTAL_PERFORMANCE_CHART_DATE(state, date) {
        console.log('>>>>>>>>>>>>>>>boom new>>>>//////////////',state.singlestockdate)
		let performancedate = [];
		performancedate = date;
        state.singlestockdate = [...performancedate];
       
    },
    SET_HORIZONTAL_PERFORMANCE_CHART_PRICE(state, price) {
        console.log('>>>>>>>>>>>>>>>boom new>>>>//////////////',state.singlestockdate)
		let performanceprice = [];
		performanceprice = price;
        state.performanceprice = [...performanceprice];
       
    },
    SET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATE(state, date) {
        console.log('>>>>>>>>>>>>>>>boom new>>>>//////////////',state.positionweightdate)
		let positionweightdate = [];
		positionweightdate = date;
        state.positionweightdate = [...positionweightdate];
       
    },
    SET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATA_PRICE(state, price) {
        console.log('>>>>>>>>>>>>>>>boom new>>>>//////////////',state.positionweightprice)
		let positionweightprice = [];
		positionweightprice = price;
        state.positionweightprice = [...positionweightprice];
       
    },
    SET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_PERCENTAGE(state, price){
        console.log('>>>>>>>>>>>>>>>boom new>>>>//////////////',state.positionperformancepercentage)
		let positionperformancepercentage = [];
		positionperformancepercentage = price;
        state.positionperformancepercentage = [...positionperformancepercentage];
    },
    SET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_SYMBOL(state, symbol){
        console.log('>>>>>>>>>>>>>>>boom new>>>>//////////////',state.positionperformancepercentage)
		let positionperformancesymbol = [];
		positionperformancesymbol = symbol;
        state.positionperformancesymbol = [...positionperformancesymbol];
    },
    SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_ACTION(state, action){
        let actionperformance = [];
		actionperformance = action;
        state.actionperformance = actionperformance;
    },
    SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_VALUE(state, value){
        let valueperformance = {};
		valueperformance = value;
        state.valueperformance = valueperformance;
    },
    SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_VALUE(state, action){
        let actionanalysis = [];
		actionanalysis = action;
        state.actionanalysis = actionanalysis;
    },
    SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_ACTION(state, value){
        let valueanalysis = {};
		valueanalysis = value;
        state.valueanalysis = valueanalysis;
    },
    SET_PRICE_INFO_ON_BLACKCARD(state, pricedetails){
        let pricedetailsvariable = {};
		pricedetailsvariable = pricedetails;
        state.pricedetailsvariable = pricedetailsvariable;
    },
    SET_GLOBALSTORE_PORTFOLIOHISTORY_INTERVAL_FOR_GRAPH(state, interval) {
        state.globalTimeforportfolioGraph = interval;
    },
    SET_GLOBALSTORE_PORTFOLIOHISTORY_CURRENCY_FOR_GRAPH(state, currency) {
        state.globalCurrencyforportfolioGraph = currency;
        
    },
    

};

const actions = {
    async GET_LINECHART_SINGLESTOCK_GRAPH_DATA({ commit }, params) {
        console.log('?????????????????????',params);
		await API_CONTEXT.get(`/instruments/charts`,params)
			.then((response) => {
                console.log('>>FFFFFFFFFFFFFFFFFFFFF>>>>>>>>GET_LINECHART_SINGLESTOCK_GRAPH_DATA>>>>>>>>>>>>>>',response.data.data)
                const { chart, derivedPrice, derivedPricePercentage, askPrice } = response.data.data;
                commit('SET_LINE_SINGLESTOCK_CHARTDATA',chart);
                commit('SET_LINE_SINGLESTOCK_CHART_DATE',chart)
                //derived prices high lows etc are gotton here
                commit('SET_PRICE_INFO_ON_BLACKCARD', response.data.data)
                console.log('inside vuex store',chart);
			})
			.catch((error) => {
               console.log(`::::::::::::::::::::${error}`);
			});
    },
    async GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS({ commit }, params) {
        console.log('?????????????????????',params);
		await API_CONTEXT.get(`/users/${params.chakaID}/positions/`)
			.then((response) => {
                //console.log('>>FFFFFFFFFFFFFFFFFFFFF>>>>>>>>GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS>>>>>>>>>>>>>>',response.data.data)
                //const { chart, derivedPrice, derivedPricePercentage, askPrice } = response.data.data;
                // commit('SET_LINE_SINGLESTOCK_CHARTDATA',chart);
                // commit('SET_LINE_SINGLESTOCK_CHART_DATE',chart)
                // //derived prices high lows etc are gotton here
                // commit('SET_PRICE_INFO_ON_BLACKCARD', response.data.data)
                console.log('GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS>>>FFFFFFFFFFFFFF',response);
			})
			.catch((error) => {
               console.log(`::::::::::::::::::::${error}`);
			});
    },
    async GET_LINECHART_PORTFOLIO_GRAPH_DATA({ commit,rootState },params) {
		await API_CONTEXT.get(`users/${rootState.auth.loggedUser.chakaID}/positions-chart/`,params)
			.then((response) => {
                console.log('>>>>>>new>>>>GET_LINECHART_PORTFOLIO_GRAPH_DATA>>>>>>>>>>>>>>',response.data.data)
                const { positions, derivedNetWorth, derivedNetWorthPercentage } = response.data.data;
                console.log('GET_LINECHART_PORTFOLIO_GRAPH_DATAJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ',derivedNetWorth,derivedNetWorthPercentage)
                commit('SET_PORTFOLIO_DERIVED_PRICE', derivedNetWorth);
                commit('SET_PORTFOLIO_DERIVED_CHANGE', derivedNetWorthPercentage);
                
                commit('SET_LINE_PORTFOLIO_CHART_PRICE',positions);
                commit('SET_LINE_PORTFOLIO_CHART_DATE',positions)
                console.log('inside vuex store',positions,derivedNetWorth,derivedNetWorthPercentage);
			})
			.catch((error) => {
               console.log(`::::::::::<<<<<>>>>>::::::::::${error}`);
			});
    },
    async GET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATA({ commit,rootState}) {
		await API_CONTEXT.get(`/users/${rootState.auth.loggedUser.chakaID}/positions-weight`)
			.then((response) => {
                commit('SET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATE',response.data.data.chart);
                commit('SET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATA_PRICE',response.data.data.chart)
			})
			.catch((error) => {
               console.log(`::::::::::::::::::::${error}`);
			});
    },
    async GET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_DATA({ commit,rootState}) {
		await API_CONTEXT.get(`/users/${rootState.auth.loggedUser.chakaID}/positions-performance/`)
			.then((response) => {
                commit('SET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_PERCENTAGE',response.data.data.chart);
                commit('SET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_SYMBOL',response.data.data.chart)
			})
			.catch((error) => {
               console.log(`::::::::::::::::::::${error}`);
			});
    },

    async GET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_DATA({ commit},params) {
		await API_CONTEXT.get(`/instruments/performance?symbol=${params.symbol}`)
			.then((response) => {
                const { performance} = response.data.data;
                commit('SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_ACTION',performance);
                commit('SET_VERTICALBARCHART_PERFORMANCERATING_GRAPH_VALUE',performance)
			})
			.catch((error) => {
               console.log(`::::::::::::::::::::${error}`);
			});
    },
    async GET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_DATA({commit},params) {
		await API_CONTEXT.get(`/instruments/analyst-recommendations?symbol=${params.symbol}`)
			.then((response) => {
                const { recommendations} = response.data.data;
                commit('SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_ACTION',recommendations);
                commit('SET_HORIZONTALBARCHART_ANALYSTSRATING_GRAPH_VALUE',recommendations)
			})
			.catch((error) => {
               console.log(`::::::::::::::::::::${error}`);
               return false;
			});
    },
    
    
};

export default {
    state,
    actions,
    getters,
    mutations
};
