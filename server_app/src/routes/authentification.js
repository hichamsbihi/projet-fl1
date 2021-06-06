
import jwt from "jsonwebtoken";
import {Router} from "express";
import bodyParser from 'body-parser';

import {USER_SECRET_KEY,USERMOBILE_SECRET_KEY} from "../config/app.js";
import {UserSerializer} from "../serializers/user_serializer.js";
import {LoginSerializer} from "../serializers/login_serializer.js";
import {setHeaders} from "./middlewares.js";
import {getStringHash} from "../core/utils.js";
import {ERROR_MESSAGES_EN,SUCCESS_MESSAGES_EN} from "../core/constants.js";
import {USER} from '../models/User.js';

const router = Router();
const _JSON2STR = JSON.stringify;

router.use(bodyParser.json());


// overwrite hashCode function of the string prototype
String.prototype.hashCode = getStringHash;



/**
 * @api {post} /api/v1.0/signup Signup
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiContentType application/json
 * @apiBody {String} email User's email
 * @apiBody {String} name  User full name
 * @apiBody {String} tele  User phone number
 * @apiBody {String} password access password
 * @apiParamExample {json} Input
 *    {
 *      "email": "test@server.fr",
 *      "name": "firstName LastName"
 *      "tele": "0607123456"
 *      "password": "password-admin1"
 *    }
 * @apiSuccess {Boolean} isActive describe the state of the user account '[active OR not-active]' (not-active by default).
 * @apiSuccess {String} idUser contains the id of the inserted user.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "isActive": false,
 *      "idUser":"82"
 *    }
 * @apiError {Number} err_number defines the generic error number to be identified in the UI.
 * @apiError {String} demande_state defines a small description of the error cause.
 * @apiErrorExample {json} Signup error
 *    HTTP/1.1 450 Error has occurred, the response describe the error
 *    {
 *      "err_number": 13,
 *      "demande_state":"error!! the user is already existed in the Database"
 *     }
 */
router.post('/api/v1.0/signup', (req, res) => {
  
  try {
        const User_serializer = new UserSerializer(req,"POST # SIGN-UP");
        const UserModel = new USER();
        console.log(User_serializer.dataToValidate);
        !User_serializer.is_valide({raise_exception: false}) && setHeaders({res,status:450}).then(()=>res.end(_JSON2STR({err_number: 11, demande_state: ERROR_MESSAGES_EN[11]})));

        USER.findOne(
          {email: User_serializer.validated_data['email']},
          (err, existingUser) => {
            if (existingUser) {
              if (!existingUser.isActive)
                setHeaders({res,status:450}).then(()=>res.end(_JSON2STR({err_number: 12 ,demande_state: ERROR_MESSAGES_EN[12]})));
              else setHeaders({res,status:450}).then(()=>res.end(_JSON2STR({err_number: 13,demande_state: ERROR_MESSAGES_EN[13]})));
            }
             else {
              UserModel.email = User_serializer.validated_data['email'];
              UserModel.tele = User_serializer.validated_data['tele'];
              UserModel.name = User_serializer.validated_data['name'];
              UserModel.password = User_serializer.validated_data['crypted_password'];
              UserModel.isActive = false;
              UserModel.inscription_Date = Date.now();
              
              UserModel.AddUser((err, reply) => {
                err && setHeaders({res,status:450}).then(()=>res.end(_JSON2STR({err_number: 14 ,demande_state: ERROR_MESSAGES_EN[14]})));
                !err && setHeaders({res,status:200}).then(()=>res.end(_JSON2STR({isActive: false ,idUser: reply})));
              });
            }
          },
        );
      
  } catch (e) {
    console.log(e);
    setHeaders({res,status:500}).then(()=>res.end(_JSON2STR({err_number: 1 ,demande_state: ERROR_MESSAGES_EN[1]})));
  }
});

/**
 * @api {post} /api/v1.0/signin Sign in
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiContentType application/json
 * @apiBody {String} email User's email
 * @apiBody {String} password User's password
 * @apiParamExample {json} Input
 *    {
 *      "email": "test@server.fr",
 *      "password": "test-admin1"
 *    }
 * @apiSuccess {String} demande_state success message
 * @apiSuccess {String} x_access_token JWT access token provided to this specific user
 * @apiSuccess {String} idUser the new ID provided to this specific user
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "demande_state": "OK",
 *      "x_access_token":"JSJKHEJF4554Z5ZA56FVkfldjfBBBF54DEEFEGHHTLMZP",
 *      "idUser": "86"
 *    }
 * @apiError {Number} err_number defines the generic error number to be identified in the UI.
 * @apiError {String} demande_state defines the error message.
 * @apiErrorExample {json} SignIn error
 *    HTTP/1.1 450 Error has occurred, the response describe the error
 *    {
 *      "err_number" : 15
 *      "demande_state":"username or password is incorrect !!"
 *      }
 */
router.post('/api/v1.0/signin', (req, res) => {

  try {
        const Login_serializer = new LoginSerializer(req,"POST # LOGIN");
        !Login_serializer.is_valide({raise_exception: false}) && setHeaders({res,status:450}).then(()=>res.end(_JSON2STR({err_number: 11, demande_state: ERROR_MESSAGES_EN[11]})));

        USER.findOne(
          {
            email: Login_serializer.validated_data["email"],
          },
          (err, existingUser) => {
            if (existingUser && Login_serializer.validatePassword(existingUser.password)) {
              if(!existingUser.isActive) setHeaders({res,status:450}).then(()=>res.end(_JSON2STR({err_number: 16, demande_state: ERROR_MESSAGES_EN[16]})));
              else 
              {
                let token_body = {...existingUser._doc,password:"hidden"};
                let token = jwt.sign(JSON.stringify(token_body), USER_SECRET_KEY);
                setHeaders({res,status:200}).then(()=>res.end(_JSON2STR({x_access_token: token,idUser:existingUser._id, demande_state: SUCCESS_MESSAGES_EN[20]})));
              }
            } else 
                setHeaders({res,status:450}).then(()=>res.end(_JSON2STR({err_number: 15, demande_state: ERROR_MESSAGES_EN[15]})));
            
          });
  } catch (e) {
    setHeaders({res,status:500}).then(()=>res.end(_JSON2STR({err_number: 1, demande_state: ERROR_MESSAGES_EN[1]})));
  }
});


export const auth_Router = router;
