import axios from "axios";
import jwtDecode from "jwt-decode";
import router from "@/router";

const baseURL = `https://test-api.chaka.io`;
const instance = axios.create({
    // baseURL: `https://c89940da-8733-4b38-9260-058a90e8895f.mock.pstmn.io`,
    baseURL,
    crossdomain: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: {
            toString() {
                return `Bearer ${localStorage.getItem("AUTH_TOKEN")}`;
                // return `Bearer "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJjaGFrYUlEIjoxMDEyNTY3ODEwLCJlbWFpbCI6InNldW5AY2hha2EubmciLCJyb2xlIjoiQ1VTVE9NRVIifSwiaWF0IjoxNTYxMzgzNzI3LCJleHAiOjE1NjEzODM3NDJ9.awx6JB7PHppMtP-PdsylXCaVqqcZRrR6SoeL-8gEohc"`;
            }
        }
    }
});

instance.interceptors.response.use(
    response => {
        return response;
    },
    function(error) {
        const originalRequest = error.config;

        if (
            originalRequest.url === `${baseURL}/auth/refresh-token` &&
            error.response.status === 400
        ) {
            router.push("/login");
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const token = jwtDecode(localStorage.getItem("AUTH_TOKEN"));
            const refreshToken = localStorage.getItem("REFRESH_TOKEN");

            return axios
                .post(`${baseURL}/auth/refresh-token/`, {
                    chakaID: `${token.user.chakaID}`,
                    refreshToken
                })
                .then(resp => {
                    if (resp.status === 200) {
                        localStorage.setItem("AUTH_TOKEN", resp.data.data.token);
                        localStorage.setItem("REFRESH_TOKEN", resp.data.data.newRefreshToken);
                        return instance(originalRequest);
                    }
                });
        }
        return Promise.reject(error);
    }
);

export default instance;
