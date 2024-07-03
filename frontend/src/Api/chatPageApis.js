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

export const searchingUser = async (endpoint, token,queryParameter) => {
    let url = `${baseUrl}/${endpoint}?searchUser=${queryParameter}`;
    let option = {
        method: "GET",
        url: url,
        headers: {
            Authorization : `Bearer ${token}`
        }
    }

    return  request(option);
}


export const saveUserChats = async (endpoint, body,token) => {
    let url = `${baseUrl}/${endpoint}`;
    let option = {
        method: "POST",
        url: url,
        data: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    return request(option);
}

export const myChats = async (endpoint, token,queryParameter) => {
    let url = `${baseUrl}/${endpoint}?objectId=${queryParameter}`;
    let option = {
        method: "GET",
        url: url,
        headers: {
            Authorization : `Bearer ${token}`
        }
    }

    return  request(option);
}


export const groupChats = async (endpoint, body,token) => {
    let url = `${baseUrl}/${endpoint}`;
    let option = {
        method: "POST",
        url: url,
        data: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        }
    }

    return request(option);
}