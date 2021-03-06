import { Router } from "express";
import jwt from "jsonwebtoken";

import { ERROR_MESSAGES_EN, SUCCESS_MESSAGES_EN } from "../core/constants.js";
import { USER_SECRET_KEY, USERMOBILE_SECRET_KEY } from "../config/app.js";

const router = Router();
const _JSON2STR = JSON.stringify;

router.use((error, req, res, next) => {
  if (error instanceof SyntaxError)
    setHeaders({
      res,
      status: 450,
    }).then(() =>
      res.send(
        _JSON2STR({ demande_state: ERROR_MESSAGES_EN[19], err_number: 19 })
      )
    );
  else next();
});

export const setHeaders = ({ res, status,extraProps = {} }) => {
  return new Promise((resolve) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "content-type": "text/json",
      ...extraProps
    };
    res.writeHead(status, headers);
    resolve();
  });
};

const jwt_sync_mdlw = (req, res, next) => {
  try {
    if (
      req.url === "/apidocs" ||
      req.url === "/api/v1.0/signin" ||
      req.url === "/api/v1.0/signup" ||
      req.url.includes("statics") ||
      req.url.includes("create") ||
      req.url.includes("stock") ||
      req.url.includes("getequipement") ||
      req.url.includes("equipement")
    )
      next();
    else {
      const token = req.headers.x_access_token;
      !token &&
        setHeaders({
          res,
          status: 450,
        }).then(() =>
          res.end(
            _JSON2STR({ demande_state: ERROR_MESSAGES_EN[18], err_number: 18 })
          )
        );

      token &&
        jwt.verify(token, USER_SECRET_KEY, (err, decoded) => {
          if (!err) {
            req.user_data = decoded;
            next();
          } else {
            jwt.verify(token, USERMOBILE_SECRET_KEY, (err, decoded) => {
              if (!err) {
                req.usermobile_data = decoded;
                next();
              } else {
                setHeaders({
                  res,
                  status: 450,
                }).then(() =>
                  res.end(
                    _JSON2STR({
                      demande_state: ERROR_MESSAGES_EN[17],
                      err_number: 17,
                    })
                  )
                );
              }
            });
          }
        });
    }
  } catch (Err) {
    console.log(Err);
    setHeaders({
      res,
      status: 450,
    }).then(() =>
      res.end(_JSON2STR({ demande_state: ERROR_MESSAGES_EN[1], err_number: 1 }))
    );
  }
};

router.use(jwt_sync_mdlw);

export const _router = router;
