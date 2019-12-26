// import API_CONTEXT from '../../services/apiService/api';
// import errorFn from '../../services/apiService/error';

// const state = {
//     socials: []
// };

// const getters = {
//     getSocials: () => state.socials
// };

// const mutations = {
//     SET_SOCIAL_OAUTH(state, summary) {
//         state.socials = summary;
//     }
// };

// const actions = {
//     async GET_SOCIAL_OAUTH_FACEBOOK({ commit, rootState },type) {
//         await API_CONTEXT.get(`/auth/${type}`)
//             .then((response) => {
//                 console.log('DDDDDDDDDDDDDDDD SOCIAL OAUTH',response)
//                 commit('SET_SOCIAL_OAUTH',response);
//             })
//             .catch((error) => {
//                 errorFn(error.response, 'portfolio');
//                 return false;
//             });
//     }
// };

// export default {
//     state,
//     actions,
//     getters,
//     mutations
// };



