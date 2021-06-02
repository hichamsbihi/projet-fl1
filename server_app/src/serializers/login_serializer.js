/**
 * In this module we define a generic serializer with valdator process of api comming data.
 * 
 */
 import { Validator } from "jsonschema";
 import {ValidatorException} from "../exceptions/ValidatorException.js";
 import {cryptPassword,comparePass} from "../core/utils.js";

 const LOGIN_API_SCHEMA = {
     "id": "/login_apiSchema",
     "type": "object",
     "properties": {
        "email": {"type":"string"},
        "password": {"type":"string"},
    },
    "required": ["email","password"]
};
 
 
  export class LoginSerializer extends Validator {
         constructor(
           request,
           apiName
         ) {
           super();
           this.jsonSchema = LOGIN_API_SCHEMA;
           this.dataToValidate = request.body;
           this.validated_data = {};
           this.apiName = apiName;
           this.details = {};
         }

         is_valide ({ raise_exception = false }){
           this.details = this.validate(this.dataToValidate,this.jsonSchema);
           if (this.details.valid){
               this.validated_data.email = this.dataToValidate.email;
               this.validated_data.crypted_password = cryptPassword(this.dataToValidate.password);
               return true;
           }
           if (!this.details.valid && raise_exception) {
             throw new ValidatorException(
               JSON.stringify(this.details.errors.map((e)=>{
                   return e.stack;
               })),
               this.apiName
             );
           }
           else return false;
         }
         validatePassword (hashFromDb){return comparePass(this.dataToValidate.password,hashFromDb);}}
       
  