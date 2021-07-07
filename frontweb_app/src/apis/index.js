import api_interface from "./api_interface";
import {API_URL} from "../configs/api_url";

export const reqAddUser = (user) => api_interface(API_URL + 'api/v1.0/signup', user, 'POST')
export const reqLogin = (email, password) => api_interface(API_URL + 'api/v1.0/signin', {email, password}, 'POST')
export const reqGetUserData = (id) => api_interface(API_URL + 'api/v1.0/me', {}, 'GET')
export const reqPostPreventifs = (data) => api_interface(API_URL + 'api/v1.0/preventifs', {arrayData: data}, 'POST');
export const reqPostCorrectifs = (data) => api_interface(API_URL + 'api/v1.0/correctifs', {arrayData: data}, 'POST');
export const reqPostEquipements = (data) => api_interface(API_URL + 'api/v1.0/equipements', {arrayData: data}, 'POST');
export const reqPostStock = (data) => api_interface(API_URL + 'api/v1.0/stock', {arrayData: data}, 'POST');

