import { Router } from "express";

import { setHeaders } from "./middlewares.js";
import { ERROR_MESSAGES_EN, SUCCESS_MESSAGES_EN } from "../core/constants.js";
import { COMMENT, FIABILISATION } from "../models/equipement.js";

const router = Router();
const _JSON2STR = JSON.stringify;

router.get("/statics/images/fiabilisation/:id_equipement", function (req, res) {
  FIABILISATION.find(
    {
      id_equipement: req.params.id_equipement,
    },
    (err, reply) => {
      if (err || !reply) {
        setHeaders({ res, status: 404 }).then(() =>
          res.end(
            _JSON2STR({ err_number: 9, demande_state: ERROR_MESSAGES_EN[9] })
          )
        );
      } else {
        var img = Buffer.from(reply.image, "base64");
        setHeaders({
          res,
          status: 200,
          extraProps: {
            "Content-Type": "image/png",
            "Content-Length": img.length,
          },
        }).then(() => res.end(img));
      }
    }
  );
});
router.get("/statics/images/comment/:id_equipement", function (req, res) {
  COMMENT.find(
    {
      id_equipement: req.params.id_equipement,
    },
    (err, reply) => {
      if (err || !reply) {
        setHeaders({ res, status: 404 }).then(() =>
          res.end(
            _JSON2STR({ err_number: 9, demande_state: ERROR_MESSAGES_EN[9] })
          )
        );
      } else {
        var img = Buffer.from(reply.image, "base64");
        setHeaders({
          res,
          status: 200,
          extraProps: {
            "Content-Type": "image/png",
            "Content-Length": img.length,
          },
        }).then(() => res.end(img));
      }
    }
  );
});

export const statics_router = router;
