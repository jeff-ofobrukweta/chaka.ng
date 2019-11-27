import store from "../../store/index";

const errorFn = (error, type) => {
    let messageObj = {};
    if (error.status === 401) {
        // refreshToken
        return true;
    }
    messageObj.message = error.data.message;
    messageObj.type = type;
    store.commit("REQ_ERROR");
    store.commit("LOG_ERROR", messageObj);
};

export default errorFn;
