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
            }
        }
    }
});

export default instance;
