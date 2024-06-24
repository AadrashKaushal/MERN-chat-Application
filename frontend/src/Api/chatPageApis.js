import { request } from "./mainRequest";
const baseUrl = 'http://localhost';

export const userProfileData = async (endpoint, token) => {
    let url = `${baseUrl}/${endpoint}`;
    let option = {
        method: "GET",
        url: url,
        headers: {
            Authorization : `Bearer ${token}`
        }
    }

    return  request(option);
}