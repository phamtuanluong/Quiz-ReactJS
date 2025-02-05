import { get, post } from "../utils/request"

export const login = async (email, password) => {
    const results = await get(`users?email=${email}&password=${password}`);
    return results;
}

export const register = async (options) => {
    const results = await post(`users`, options);
    return results;
}

export const checkExits = async (key, value) => {
    const results = await get(`users?${key}=${value}`);
    return results;
}