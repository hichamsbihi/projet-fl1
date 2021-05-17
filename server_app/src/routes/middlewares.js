const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.use(require('body-parser').json());


import {USER_SECRET_KEY} from "../config/app";
import User_SERIALIZER from "../serializers/user";


const setHeaders = ({res,status,render})=>{
    return new Promise(res=> {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept',
        );
        res.writeHead(status, { 'content-type': 'text/json' });
        res.end(render);
        res();
    })

};

const jwt_sync_mdlw = (req, res, next) => {
      try {
        const token = req.headers.x_access_token;
        !token && setHeaders({
            res,status:450,render: '{"demande_state":"error!! please provide the token on your request"}'
        }).then(()=> res.end());

        jwt.verify(token, USER_SECRET_KEY, (err, decoded) => {
          if (!err) {
                req.url.includes('admin') && (req.admin_data = new User_SERIALIZER(decoded));
                req.connection_time = Date.now();
                next();
            }
            setHeaders({
                res,status:450,render: '{"demande_state":"error!! please provide the token on your request"}'
            }).then(()=> res.end());
        });
      } catch (err) {
        setHeaders({
            res,status:450,render: { auth: false, message: 'Failed to authenticate token.' }
        }).then(()=> res.end());
      }
    };

router.use(jwt_sync_mdlw);

export const router = router;