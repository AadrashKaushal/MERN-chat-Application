import axios from "axios";

export const request = async (option) => {
    let response = await axios(option);
    return response.data;
}