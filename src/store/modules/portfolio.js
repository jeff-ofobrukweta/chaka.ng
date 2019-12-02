import API_CONTEXT from '../../services/apiService/api';

const state = {
    portfolioSummary: [
        {
            icon: 'portfolio1',
            total: 343.661,
            type: 'local',
            currency: 'NGN',
            title: 'Total Value on Local Stocks',
            stocks: [
                {
                    name: 'TSLA',
                    quantity: 0.41455,
                    price: 100.3,
                    percent: 1.5,
                    currency: 'USD'
                },
                {
                    name: 'GOOGL',
                    quantity: 1.3442,
                    price: 201.3,
                    percent: 0.23,
                    currency: 'USD'
                },
                {
                    name: 'MTNN',
                    quantity: 25.2233,
                    price: 20.1,
                    percent: 25,
                    currency: 'NGN'
                }
            ]
        },
        {
            icon: 'portfolio2',
            total: 343.661,
            type: 'global',
            currency: 'USD',
            title: 'Total Value on Global Stocks',
            stocks: [
                {
                    name: 'TSLA',
                    quantity: 0.41455,
                    price: 100.3,
                    percent: 1.5,
                    currency: 'USD'
                },
                {
                    name: 'GOOGL',
                    quantity: 1.3442,
                    price: 201.3,
                    percent: 0.23,
                    currency: 'USD'
                },
                {
                    name: 'MTNN',
                    quantity: 25.2233,
                    price: 20.1,
                    percent: 25,
                    currency: 'NGN'
                }
            ]
        },
        {
            icon: 'portfolio3',
            total: 343.661,
            currency: 'NGN',
            type: 'open-orders',
            title: 'Open Orders',
            stocks: [
                {
                    name: 'TSLA',
                    quantity: 0.41455,
                    price: 100.3,
                    percent: 1.5,
                    currency: 'USD'
                },
                {
                    name: 'GOOGL',
                    quantity: 1.3442,
                    price: 201.3,
                    percent: 0.23,
                    currency: 'USD'
                },
                {
                    name: 'MTNN',
                    quantity: 25.2233,
                    price: 20.1,
                    percent: 25,
                    currency: 'NGN'
                }
            ]
        }
    ],
    totalpositionsGlobalLocalOpenorderscardDetails:{}
};

const getters = {
    getPortfolioSummary: () => state.portfolioSummary,
     // card details getter in Portfolio card
     getPortfoliopositionsCarddetails:(state) => {
        return state.totalpositionsGlobalLocalOpenorderscardDetails;
    },
    // ends here
};

const mutations = {
    SET_SUMMARY(state, summary) {
        state.portfolioSummary = summary;
    },
    SET_POSITIONS_HELD_FOR_PORTFOLIOCARDS(state, details) {
        state.totalpositionsGlobalLocalOpenorderscardDetails = details;
    },
};

const actions = {
    async GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS({ commit,rootState }) {
        console.log('RRRRRRRRTTTTTTTTTTTTTTTTTTRRRRRRRRRRRRRRRRRR')
		await API_CONTEXT.get(`/users/${rootState.auth.loggedUser.chakaID}/positions/`)
			.then((response) => {
                //console.log('>>FFFFFFFFFFFFFFFFFFFFF>>>>>>>>GET_POSITIONS_HELD_FOR_PORTFOLIOCARDS>>>>>>>>>>>>>>',response.data.data)
                //const { chart, derivedPrice, derivedPricePercentage, askPrice } = response.data.data;
                commit('SET_POSITIONS_HELD_FOR_PORTFOLIOCARDS',response.data.data);
                // commit('SET_LINE_SINGLESTOCK_CHART_DATE',chart)
                // //derived prices high lows etc are gotton here
                // commit('SET_PRICE_INFO_ON_BLACKCARD', response.data.data)
                console.log('>>>FFFFFFFFFFFFFFNEW?????????????????',response.data.data);
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
