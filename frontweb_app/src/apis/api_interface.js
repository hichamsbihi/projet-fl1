import axios from 'axios'
import {ERROR_MESSAGES} from "../utils/CONSTANTS"


export default function api_interface(url, data = {}, type = "GET") {

    const user = sessionStorage.getItem("user");
    if (!JSON.parse(user) && !url.includes('users')) {
        return new Promise((res, rej) => {
            rej(ERROR_MESSAGES.SESSION_EXPIRED);
        });
    }
    const API_HEADERS = {
        'x_access_token': ((JSON.parse(user)) ? JSON.parse(user).token : ""),
        'Cache-Control': 'no-cache',
        'Content-type': 'application/json; charset=UTF-8',

    };

    return new Promise((resolve, reject) => {   // new promise  object
        let promise

        if (type === "GET") {

            promise = axios.get(url, {
                params: data,
                headers: API_HEADERS
            });
            promise.then(response => {
                resolve(response)
            }).catch(error => {
                reject(error);

            });
        } else if (type === "GET FILE") {
            promise = axios.get(url, {
                responseType: 'arraybuffer',
                params: data,
                headers: API_HEADERS
            });
            promise.then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            });
        } else if (type === 'POST FILE') {
            promise = axios.post(url, data, {
                headers: API_HEADERS
            });

            promise.then((response) => {
                resolve(response)
            }).catch(error => {

                setLoadProgress(null, 'Error');
                reject()

            });


        } else if (type === "POST") {

            let headers =
                {headers: API_HEADERS};

            promise = axios.post(url, data, headers);
            promise.then(response => {

                resolve(response)
            }).catch(error => {
                reject(error)
            });
        } else if (type === "DELETE") {
            let headers = {headers: API_HEADERS};

            promise = axios.delete(url + getUrlParams(data), headers, {params: data});
            promise.then(response => {

                resolve(response)
            }).catch(error => {
                reject(error)

            });
        } else if (type === "PUT") {
            let headers = {headers: API_HEADERS};

            promise = axios.put(url, data, headers);
            promise.then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)

            });
        }

    });


}


function getUrlParams(params) {
    let paramsInURL = '?';
    for (const param in params) {
        paramsInURL += param + '=' + params[param] + '&';
    }
    return paramsInURL;
}

