/*

this component provide the storage service for all the components.
the localstorage used just to save unexpired data as (some util files/ group of fetched informations which are importants as a ready data bulk )

 */
import CryptoJS from "crypto-js";
import { reqGetUserData } from "../apis";


export class LocalData {
    constructor(myKey) {
        this.myKey = myKey;
      }

    saveInBuffer = ({user_id,body})=>{
        let encrypted = CryptoJS.AES.encrypt(JSON.stringify(body), this.myKey);
        localStorage.setItem(user_id.toString(),encrypted);
    }
    getfromBuffer = ({user_id,body}) =>{
         let savedData = localStorage.getItem(user_id.toString());
         if(!savedData) return null;
        try{
         let decrypted = CryptoJS.AES.decrypt(savedData, this.myKey);
         return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
        }
        catch(e){
            return [];
        }
         
    }
    deleteItem = ({user_id})=>{
        localStorage.removeItem(user_id.toString());
    }

 }
 class UserData {
    constructor(id,token) {
        this.userId = id;
        this.token = token;
        this.userData={};
      }

    async fetchUserData(id){
        this._userData = await reqGetUserData(id);
        return true;
    }
    get userId(){
        return this._userId;
    }
    get token(){
        return this._token;
    }
    set userId(id)
    {this._userId = id;
    }

    set userData(dt)
    {this._userData = dt;
    }

    set token(tk){
        this._token = tk;
    }

    get userData(){
        return this._userData;
    }
 }

 
 export default function UserMem(){

    let connectedUserData;

    async function syncUserData(callback) {

        let usr = JSON.parse(sessionStorage.getItem('user'));
        var nvUser = new UserData(usr.id,usr.token);
        await nvUser.fetchUserData(usr.id);
        sessionStorage.setItem('userData',JSON.stringify(nvUser.userData));
        connectedUserData = nvUser.userData;
        callback();
        return;

    }

    return {
        connectedUserData: connectedUserData,
        syncUserData: syncUserData
    };


 }


 
  

