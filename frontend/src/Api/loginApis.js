import { request } from "./mainRequest";
const baseUrl = 'http://localhost';


export const signupAccount = async (endpoint, body) => {
    let url = `${baseUrl}/${endpoint}`;
    let option = {
        method: "POST",
        url: url,
        data: body,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    return request(option);
}

export const userAccountLogin = async (endpoint, body) => {
    let url = `${baseUrl}/${endpoint}`;
    let option = {
        method: "POST",
        url: url,
        data: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return request(option);
}