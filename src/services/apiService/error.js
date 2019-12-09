import store from "../../store/index";

const errorFn = (error, type, source) => {
    let messageObj = {}; 
    if(error !== undefined){
         messageObj.message = error.data ? error.data.message : error;
    }
    else{
        messageObj.message = "Unable to complete your request at the moment";
    }
   
    messageObj.type = type;
    messageObj.source = source;
    store.commit("REQ_ERROR");
    store.commit("LOG_ERROR", messageObj);
};

export default errorFn;
