const router = require('express').Router();
const jwt = require('jsonwebtoken');

import { USER_SECRET_KEY } from "../config/app";
import { USERMOBILE_SECRET_KEY } from "../config/app";
import { UserSerializer } from "../serializers/user_serializer";
import { UserMobileSerializer } from "../serializers/usermobile_serializer";



export const setHeaders = ({ res, status }) => {
  return new Promise(resolve => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.writeHead(status, { 'content-type': 'text/json' });
    resolve();
  });
};

const jwt_sync_mdlw = (req, res, next) => {
  try {
    if (req.url === '/api/v1.0/signin')  next();
    else {

      const token = req.headers.x_access_token;
      !token && setHeaders({
        res, status: 450
      }).then(() => res.end('{"demande_state":"error!! please provide the token on your request"}'));

      jwt.verify(token, USER_SECRET_KEY, (err, decoded) => {
        if (!err) {
          req.admin_data = new UserSerializer(decoded);
          req.connection_time = Date.now();
          next();
        }
        else {
          jwt.verify(token, USERMOBILE_SECRET_KEY, (err, decoded) => {
            if (!err) {
              req.usermobile_data = new UserMobileSerializer(decoded);
              req.connection_time = Date.now();
              next();
            }
            else {
              setHeaders({
                res, status: 450
              }).then(() => res.end('{"demande_state":"error!! please provide the token on your request"}'));
            }
          });
        }
      });
    }
  } catch (Err) {
    console.log(Err);
    setHeaders({
      res, status: 450
    }).then(() => res.end({ auth: false, message: 'Failed to authenticate token.' }));
  }
};


router.use(require('body-parser').json());
router.use((error, req, res, next) => {
  if (error instanceof SyntaxError)
    setHeaders({
      res, status: 450
    }).then(() => res.end('{"demande_state":"Please verify the syntax of your request !!"}'));
  else next();

});
router.use(jwt_sync_mdlw);

export const _router = router;