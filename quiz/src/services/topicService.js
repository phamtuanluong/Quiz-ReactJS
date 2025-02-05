import { get } from "../utils/request";

export const getListTopic = async () => {
    const results = await get(`topics`);
    return results;
}

export const getTopic = async (id) => {
    const results = await get(`topics/${id}`);
    return results;
}