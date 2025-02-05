import { post } from "../utils/request";

export const createAnswer = async (options) => {
    const results = await post(`answers`, options);
    return results;
}