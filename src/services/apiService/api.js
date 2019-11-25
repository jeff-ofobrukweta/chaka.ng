import instance from './axios';

export default {
    get(url, params) {
        return instance.get(url, { params });
    },
    post(url, data) {
        return instance.post(url, data);
    },
    patch(url, data) {
        return instance.patch(url, data);
    },
    delete(url) {
        return instance.delete(url);
    }
};
