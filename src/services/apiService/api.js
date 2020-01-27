import instance from "./axios";

export default {
    get(url, params) {
        return instance.get(url, { params });
    },
    post(url, data, params) {
        return instance.post(url, data, { params: { ...params } });
    },
    patch(url, data) {
        return instance.patch(url, data);
    },
    delete(url, data) {
        return instance.delete(url, { data });
    }
};
