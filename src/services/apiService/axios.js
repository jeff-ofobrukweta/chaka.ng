import axios from "axios";

const instance = axios.create({
    baseURL: `https://ab5b9823-c3f0-4197-a430-5e0915b46501.mock.pstmn.io`,
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
