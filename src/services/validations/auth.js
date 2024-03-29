const auth = {
    email: (value) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
    },
    password: (value) => {
        const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
        return re.test(String(value).toLowerCase());
    }
};

export default auth;
