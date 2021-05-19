

import bodyParser from 'body-parser';

import {setHeaders} from "./middlewares.js";
import {ERROR_MESSAGES_EN,SUCCESS_MESSAGES_EN} from "../core/constants.js";
import EQUIPEMENT from '../models/Equipement.js';

router.use(bodyParser.json());
router.use(require('body-parser').json());

/**
 * @api {get} /api/v1.0/equipement/:id Get equipement with its id
 * @apiVersion 1.0.0
 * @apiGroup Equipement
 * @apiHeader {String} x_access_token Users unique jwt-access-key.
 * @apiParam {String} id the unique code of the wanted equipement.
 * @apiSuccess {Object} equipement all equipemetn data from all tables.
 * @apiSuccessExample {json} Success, the Order state has been updated to pickedUp
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": 4,
 *      "field1": "value1"
 *      "field2": "value2"
 *      "field3": "value3"
 *      "field4": "value4"
 *    }
 * @apiErrorExample {json} equipement not found
 *    HTTP/1.1 404 Error has occurred, the response describe the error
 *    {
 *      "demande_state":"equipement not found !!",
 *      "err_number" : 9
 *      }
 */
 router.get('/api/v1.0/equipement/:id', (req, res) => {
    if (!req.user_data || !req.usermobile_data) 
        setHeaders({res,status:450}).then(()=>res.end(_JSON2STR({err_number: 17, demande_state: ERROR_MESSAGES_EN[17]})));
    try {
      if (!req.params.id) 
        setHeaders({res,status:450}).then(()=>res.end(_JSON2STR({err_number: 10, demande_state: ERROR_MESSAGES_EN[10]})));
      else {
        EQUIPEMENT.findOne(req.params.id, (err, reply) => {
          if (err || !reply) {
            setHeaders({res,status:404}).then(()=>res.end(_JSON2STR({err_number: 9, demande_state: ERROR_MESSAGES_EN[9]})));
          } else {
            setHeaders({res,status:200}).then(()=>res.end(_JSON2STR(reply)));
          }
        });
      }
    } catch (e) {
      console.log(e);
      setHeaders({res,status:450}).then(()=>res.end(_JSON2STR({err_number: 1, demande_state: ERROR_MESSAGES_EN[1]})));
    }
  });


  /**
 * @api {get} /api/v1.0/equipement/all Get all equipement data
 * @apiVersion 1.0.0
 * @apiGroup Equipement
 * @apiHeader {String} x_access_token Users unique jwt-access-key.
 * @apiSuccess {Object[]} equipement all equipemetn data from all tables.
 * @apiSuccessExample {json} Success, the Order state has been updated to pickedUp
 *    HTTP/1.1 200 OK
 *    [{
 *      "_id": 4,
 *      "code": 45652,
 *      "field1": "value1"
 *      "field2": "value2"
 *      "field3": "value3"
 *      "field4": "value4"
 *    },
 *    {
 *      "_id": 5,
 *      "code": 47584,
 *      "field1": "value1"
 *      "field2": "value2"
 *      "field3": "value3"
 *      "field4": "value4"
 *    }
 *      ]
 * @apiErrorExample {json} user not identified
 *    HTTP/1.1 450 Error has occurred, the response describe the error
 *    {
 *      "demande_state":"wrong token",
 *      "err_number" : 17
 *      }
 */
 router.get('/api/v1.0/equipement/all', (req, res) => {
    if (!req.user_data || !req.user_data._id) 
        setHeaders({res,status:450}).then(()=>res.end(_JSON2STR({err_number: 17, demande_state: ERROR_MESSAGES_EN[17]})));
    try {
        EQUIPEMENT.find((err, reply) => {
          if (err || !reply) {
            setHeaders({res,status:404}).then(()=>res.end(_JSON2STR({err_number: 9, demande_state: ERROR_MESSAGES_EN[9]})));
          } else {
            setHeaders({res,status:200}).then(()=>res.end(_JSON2STR(reply)));
          }
        });
    } catch (e) {
      console.log(e);
      setHeaders({res,status:450}).then(()=>res.end(_JSON2STR({err_number: 1, demande_state: ERROR_MESSAGES_EN[1]})));
    }
  });