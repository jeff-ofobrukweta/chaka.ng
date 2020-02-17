import axios from 'axios'

export const API = 'https://test-api.chaka.io';

export const login = (user, callback) => {
    axios.post('/users', {
        email: user.email,
        password: user.password
    }, callback);
}
