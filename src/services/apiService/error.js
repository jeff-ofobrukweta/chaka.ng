import store from "../../store/index";

const errorFn = (error, type) => {
    let messageObj = {};
    messageObj.message = error.data ? error.data.message : error;
    messageObj.type = type;
    store.commit("REQ_ERROR");
    store.commit("LOG_ERROR", messageObj);
};

export default errorFn;
