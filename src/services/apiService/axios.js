import axios from "axios";

const instance = axios.create({
    baseURL: `https://test-api.chaka.io`,
    crossdomain: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: {
            toString() {
                return `Bearer ${localStorage.getItem("AUTH_TOKEN")}`;
            }
        }
    }
});

export default instance;
