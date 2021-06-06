import api_interface from "./api_interface";
import {API_URL} from "../configs/api_url";

export const reqAddUser = (user) => api_interface(API_URL + 'api/v1.0/signup', user, 'POST')
export const reqLogin = (email, password) => api_interface(API_URL + 'api/v1.0/signin', {email, password}, 'POST')
export const reqGetUserData = (id) => api_interface(API_URL + 'api/v1.0/me', {}, 'GET')