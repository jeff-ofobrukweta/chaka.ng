import axios from 'axios'

export const API = 'https://test-api.chaka.io';

export const login = async body => {
    const url = `${API}/auth/login`;
    return await axios.post(url, body);
};
