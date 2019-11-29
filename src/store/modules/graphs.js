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
    pricedetailsvariable:{}
    
};

const getters = {
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



};

const mutations = {
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
    SET_PRICE_INFO_ON_BLACKCARD(state, pricedetails){
        let pricedetailsvariable = {};
		pricedetailsvariable = pricedetails;
        state.pricedetailsvariable = pricedetailsvariable;
    }

};

const actions = {
    async GET_LINECHART_SINGLESTOCK_GRAPH_DATA({ commit }, params) {
        console.log('?????????????????????',params);
		await API_CONTEXT.get(`/instruments/charts`,params)
			.then((response) => {
                console.log('>>>>>>>>>>GET_LINECHART_SINGLESTOCK_GRAPH_DATA>>>>>>>>>>>>>>',response.data.data)
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
    async GET_LINECHART_PORTFOLIO_GRAPH_DATA({ commit,rootState }) {
        console.log('?????????????????????');
		await API_CONTEXT.get(`users/${rootState.auth.loggedUser.chakaID}/positions-chart/`)
			.then((response) => {
                console.log('>>>>>>new>>>>GET_LINECHART_PORTFOLIO_GRAPH_DATA>>>>>>>>>>>>>>',response.data.data)
                const { positions, derivedNetWorth, derivedNetWorthPercentage } = response.data.data;
                commit('SET_LINE_PORTFOLIO_CHART_PRICE',positions);
                commit('SET_LINE_PORTFOLIO_CHART_DATE',positions)
                console.log('inside vuex store',positions,derivedNetWorth,derivedNetWorthPercentage);
			})
			.catch((error) => {
               console.log(`::::::::::<<<<<>>>>>::::::::::${error}`);
			});
    },
    async GET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATA({ commit,rootState}) {
        console.log('on mount..........', rootState.auth)
		await API_CONTEXT.get(`/users/${rootState.auth.loggedUser.chakaID}/positions-weight`)
			.then((response) => {
                console.log('>>>>>>>>>>GET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATA>>>>>>>>>>>>>>',response)
                commit('SET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATE',response.data.data.chart);
                commit('SET_POSITION_WEIGHT_DOUGHNUT_GRAPH_DATA_PRICE',response.data.data.chart)
                // console.log('inside vuex store',response);
                console.log('>>>>>>>>>>nerrrtryryryry>>>>>>>>>>>>>>',response.data.data.chart)
			})
			.catch((error) => {
               console.log(`::::::::::::::::::::${error}`);
			});
    },
    async GET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_DATA({ commit,rootState}) {
        console.log('????????????rootState.auth.loggedUser?????????',rootState.auth.loggedUser);
		await API_CONTEXT.get(`/users/${rootState.auth.loggedUser.chakaID}/positions-performance/`)
			.then((response) => {
                console.log('>>>>>>>>>>GET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_DATA>>>>>>>>>>>>>>',response)
                commit('SET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_PERCENTAGE',response.data.data.chart);
                commit('SET_POSITION_PERFORMANCE_THINBARCHART_GRAPH_SYMBOL',response.data.data.chart)
                // console.log('inside vuex store',response);
			})
			.catch((error) => {
               console.log(`::::::::::::::::::::${error}`);
			});
    },
    
};

export default {
    state,
    actions,
    getters,
    mutations
};