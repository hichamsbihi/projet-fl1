import { Router } from "express";

import { setHeaders } from "./middlewares.js";
import { ERROR_MESSAGES_EN, SUCCESS_MESSAGES_EN } from "../core/constants.js";
import {
  FIABILISATION
} from "../models/equipement.js";

const router = Router();
const _JSON2STR = JSON.stringify;

router.get("/statics/images/:id_equipement", function(req, res) {
    FIABILISATION.find({
        id_equipement: req.params.id_equipement,
      }, (err, reply) => {
        if (err || !reply || !reply.length) {
          setHeaders({ res, status: 404 }).then(() =>
            res.end(
              _JSON2STR({ err_number: 8, demande_state: ERROR_MESSAGES_EN[8] })
            )
          );
        } else {
            console.log(reply);
            var img = Buffer.from(reply.image, 'base64');
            setHeaders({ res, status: 200,
                extraProps:{
                'Content-Type': 'image/png',
                'Content-Length': img.length
            } }).then(() =>
                        res.end(img)
                        );
                    }
                });
    
});


export const statics_router = router;
