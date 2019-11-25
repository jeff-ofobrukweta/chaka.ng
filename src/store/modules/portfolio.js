import api from '../../services/apiService/api';

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
    ]
};

const getters = {
    getPortfolioSummary: () => state.portfolioSummary
};

const mutations = {
    SET_SUMMARY(state, summary) {
        state.portfolioSummary = summary;
    }
};

const actions = {};

export default {
    state,
    actions,
    getters,
    mutations
};
