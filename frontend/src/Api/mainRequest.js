import axios from "axios";

export const request = async (option) => {
    let response = await axios(option);
    if (response.data.response) {
        return response.data;
    } else {
        return false;
    }
}