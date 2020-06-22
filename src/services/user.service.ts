import axios from '../config';
import {User} from "../reducers/user.reducer";

export const get = (apiEndpoint: string) => axios.get(apiEndpoint).then((response) => {
    return response;
});

export const post = (apiEndpoint: string, payload: User) => axios.post(apiEndpoint, payload).then((response) => {
    return response;
});

export const put = (apiEndpoint: string, payload: User) => axios.put(apiEndpoint, payload).then((response) => {
    return response;
});

export const remove = (apiEndpoint: string) => axios.delete(apiEndpoint).then((response) => {
    return response;
});
