const errorFn = (error, type) => {
    let messageObj = {};
    if (error.response) {
        if (error.response.status === 400) {
            messageObj = new Error(Object.keys(error.response.data));
        }
        if (error.response.status === 401) {
            // refreshToken
        }
        messageObj.message = error.response.data.message;
    } else if (error.request) {
        // console.log('Request ERR: ', error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        messageObj.message = error.message;
    }
    messageObj.type = type;
    return messageObj;
    // console.log(error.config);
};

export default errorFn;
