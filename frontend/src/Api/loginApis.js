const baseUrl = 'http://localhost';

const request = async(url,option) => {
    let response = await fetch(url,option) ;
    response = await response.json();
    
    if(response.response) {
        return response.data;
    } else {
        return false;
    }
}


export const signupAccount = async(endpoint,body) => {
    let url = `${baseUrl}/${endpoint}`;
    let option = {
        method : "POST",
        body : body
    }

    return request(url,option);
}