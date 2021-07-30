import api_interface from "./api_interface";
import {API_URL} from "../configs/api_url";

export const reqAddUser = (user) => api_interface(API_URL + 'api/v1.0/signup', user, 'POST')
export const reqLogin = (email, password) => api_interface(API_URL + 'api/v1.0/signin', {email, password}, 'POST')
export const reqGetUserData = (id) => api_interface(API_URL + 'api/v1.0/me', {}, 'GET')
export const reqPostPreventifs = (data) => api_interface(API_URL + 'api/v1.0/preventifs', {arrayData: data}, 'POST');
export const reqPostCorrectifs = (data) => api_interface(API_URL + 'api/v1.0/correctifs', {arrayData: data}, 'POST');
export const reqPostEquipements = (data) => api_interface(API_URL + 'api/v1.0/equipements', {arrayData: data}, 'POST');
export const reqPostStock = (data) => api_interface(API_URL + 'api/v1.0/stock', {arrayData: data}, 'POST');
export const reqPostDocs = (data) => api_interface(API_URL + 'api/v1.0/equipement/documentation', {arrayData: data}, 'POST');
export const reqPostQsseData= (data) => api_interface(API_URL + 'api/v1.0/equipement/qssedata', {arrayData: data}, 'POST');
export const reqPostSchema = (data) => api_interface(API_URL + 'api/v1.0/equipement/schema', {arrayData: data}, 'POST');
export const reqPostMesure = (data) => api_interface(API_URL + 'api/v1.0/equipement/mesures', {arrayData: data}, 'POST');
export const reqGetComments = (data) => api_interface(API_URL + 'api/v1.0/equipement/comment', {}, 'GET');
export const reqGetFiabilisation = (data) => api_interface(API_URL + 'api/v1.0/equipement/fiabilisation', {}, 'GET');

