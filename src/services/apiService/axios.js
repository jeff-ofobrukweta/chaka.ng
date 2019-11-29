import axios from "axios";

const instance = axios.create({
    // baseURL: `https://c89940da-8733-4b38-9260-058a90e8895f.mock.pstmn.io`,
    baseURL: `https://test-api.chaka.io`,
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

export default instance;
