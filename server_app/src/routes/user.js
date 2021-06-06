

import {Router} from "express";
import bodyParser from 'body-parser';
import {setHeaders} from "./middlewares.js";
import {ERROR_MESSAGES_EN} from "../core/constants.js";
import {USER} from '../models/User.js';

const router = Router();
router.use(bodyParser.json());

const _JSON2STR = JSON.stringify

/**
 * @api {get} /api/v1.0/me Get user's infos
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiHeader {String} x_access_token Users unique jwt-access-key.
 * @apiContentType application/json
 * @apiSuccess {String} _id the id number of the user.
 * @apiSuccess {String} tele the phone number of the user.
 * @apiSuccess {String} name the full name of this user
 * @apiSuccess {String} email the email of the user.
 * @apiSuccess {String} isActive the state of the user.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *           "_id": "541",
 *           "tele": "0607123456",
 *           "email": "test@server.fr",
 *           "name": "zikos",
 *           "password": "hidden",
 *           "isActive": true
 *    }
 * @apiError {Number} err_number defines the generic error number to be identified in the UI.
 * @apiError {String} demande_state defines a small description of the error cause.
 * @apiErrorExample {json} error while retreiving data
 *    HTTP/1.1 450 Error has occurred, the response describe the error
 *    {
 *      "err_number": 17,
 *      "demande_state":"wrong token !"
 *      }
 */
 router.get('/api/v1.0/me', (req, res) => {
    
    try {
      console.log(_JSON2STR(req.user_data._id))
      if (!req.user_data || !req.user_data._id)
      {
        setHeaders({res,status:450}).then(()=>res.end(_JSON2STR({err_number: 17, demande_state: ERROR_MESSAGES_EN[17]})));

      }
      else{
        USER.GetProfile(req.user_data._id, (err, results) => {
        if (err)
            setHeaders({res,status:450}).then(()=>res.end(_JSON2STR({err_number: 17, demande_state: ERROR_MESSAGES_EN[17]})));
         else {
          setHeaders({res,status:200}).then(()=>res.end(_JSON2STR(results)));
        }
      });
      }
      
    } catch (e) {
      setHeaders({res,status:450}).then(()=>res.end(_JSON2STR({err_number: 1, demande_state: ERROR_MESSAGES_EN[1]})));
    }
  });
  export const user_Router = router;
