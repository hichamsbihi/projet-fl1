import bodyParser from "body-parser";
import { Router } from "express";

import { setHeaders } from "./middlewares.js";
import { ERROR_MESSAGES_EN, SUCCESS_MESSAGES_EN } from "../core/constants.js";
import {
  EQUIPEMENT,
  CORRECTIF,
  PREVENTIF,
  STOCK,
  COMMENT,
} from "../models/equipement.js";
// import {equipementSerializer} from "../serializers/equipement_serializer.js";

const router = Router();
const _JSON2STR = JSON.stringify;

router.use(bodyParser.json());

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
// router.get("/api/v1.0/equipement/:id", (req, res) => {
//   if (!req.user_data || !req.usermobile_data)
//     setHeaders({ res, status: 450 }).then(() =>
//       res.end(
//         _JSON2STR({ err_number: 17, demande_state: ERROR_MESSAGES_EN[17] })
//       )
//     );
//   try {
//     if (!req.params.id)
//       setHeaders({ res, status: 450 }).then(() =>
//         res.end(
//           _JSON2STR({ err_number: 10, demande_state: ERROR_MESSAGES_EN[10] })
//         )
//       );
//     else {
//       EQUIPEMENT.findOne(req.params.id, (err, reply) => {
//         if (err || !reply) {
//           setHeaders({ res, status: 404 }).then(() =>
//             res.end(
//               _JSON2STR({ err_number: 9, demande_state: ERROR_MESSAGES_EN[9] })
//             )
//           );
//         } else {
//           setHeaders({ res, status: 200 }).then(() =>
//             res.end(_JSON2STR(reply))
//           );
//         }
//       });
//     }
//   } catch (e) {
//     console.log(e);
//     setHeaders({ res, status: 450 }).then(() =>
//       res.end(_JSON2STR({ err_number: 1, demande_state: ERROR_MESSAGES_EN[1] }))
//     );
//   }
// });

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
router.get("/api/v1.0/equipement/all", (req, res) => {
  if (!req.user_data || !req.user_data._id)
    setHeaders({ res, status: 450 }).then(() =>
      res.end(
        _JSON2STR({ err_number: 17, demande_state: ERROR_MESSAGES_EN[17] })
      )
    );
  try {
    EQUIPEMENT.find((err, reply) => {
      if (err || !reply) {
        setHeaders({ res, status: 404 }).then(() =>
          res.end(
            _JSON2STR({ err_number: 9, demande_state: ERROR_MESSAGES_EN[9] })
          )
        );
      } else {
        setHeaders({ res, status: 200 }).then(() => res.end(_JSON2STR(reply)));
      }
    });
  } catch (e) {
    console.log(e);
    setHeaders({ res, status: 450 }).then(() =>
      res.end(_JSON2STR({ err_number: 1, demande_state: ERROR_MESSAGES_EN[1] }))
    );
  }
});

router.get("/api/v1.0/getequipement/:QRcode", async (req, res) => {
  try {
    let inc = 0;
    const replybody = {};
    // const Equipement_serializer = new equipementSerializer(req);
    // !Equipement_serializer.is_valide({ raise_exception: false }) &&
    !req.params.QRcode &&
      setHeaders({ res, status: 450 }).then(() =>
        res.end(
          _JSON2STR({ err_number: 11, demande_state: ERROR_MESSAGES_EN[11] })
        )
      );

    EQUIPEMENT.getequipement(
      {
        code: req.params.QRcode,
        _this_ref: EQUIPEMENT,
      },
      (err, results) => {
        console.log(err, results);
        if (err)
          setHeaders({ res, status: 450 }).then(() =>
            res.end(
              _JSON2STR({
                err_number: 17,
                demande_state: ERROR_MESSAGES_EN[17],
              })
            )
          );
        else {
          inc++;
          replybody.equipement = results;
          console.log(replybody);
          inc === 3 &&
            setHeaders({ res, status: 200 }).then(() =>
              res.end(_JSON2STR(replybody))
            );
        }
      }
    );

    CORRECTIF.getequipement(
      {
        id_equipement: req.params.QRcode,
        _this_ref: CORRECTIF,
      },
      (err, results) => {
        if (err)
          setHeaders({ res, status: 450 }).then(() =>
            res.end(
              _JSON2STR({
                err_number: 17,
                demande_state: ERROR_MESSAGES_EN[17],
              })
            )
          );
        else {
          inc++;
          replybody.correctif = results;

          inc === 3 &&
            setHeaders({ res, status: 200 }).then(() =>
              res.end(_JSON2STR(replybody))
            );
        }
      }
    );

    PREVENTIF.getequipement(
      {
        id_equipement: req.params.QRcode,
        _this_ref: PREVENTIF,
      },
      (err, results) => {
        if (err)
          setHeaders({ res, status: 450 }).then(() =>
            res.end(
              _JSON2STR({
                err_number: 17,
                demande_state: ERROR_MESSAGES_EN[17],
              })
            )
          );
        else {
          inc++;
          replybody.preventif = results;

          inc === 3 &&
            setHeaders({ res, status: 200 }).then(() =>
              res.end(_JSON2STR(replybody))
            );
        }
      }
    );

    COMMENT.getequipement(
      {
        id_equipement: req.params.QRcode,
        _this_ref: COMMENT,
      },
      (err, results) => {
        if (err)
          setHeaders({ res, status: 450 }).then(() =>
            res.end(
              _JSON2STR({
                err_number: 17,
                demande_state: ERROR_MESSAGES_EN[17],
              })
            )
          );
        else {
          inc++;
          replybody.comments = results;

          inc === 3 &&
            setHeaders({ res, status: 200 }).then(() =>
              res.end(_JSON2STR(replybody))
            );
        }
      }
    );
  } catch (e) {
    console.log(e);
    setHeaders({ res, status: 450 }).then(() =>
      res.end(_JSON2STR({ err_number: 1, demande_state: ERROR_MESSAGES_EN[1] }))
    );
  }
});

/*
 * @api {get} /api/v1.0/equipement/stock Get stock
 * @apiVersion 1.0.0
 * @apiGroup Stock
 * @apiHeader {String} x_access_token Users unique jwt-access-key.
 * @apiSuccess {Object} Stock all stock data from all tables.
 * @apiSuccessExample {json} Success, the Order state has been updated to pickedUp
 *    HTTP/1.1 200 OK
 *    {
 *
 *    }
 * @apiErrorExample {json} stock not found
 *    HTTP/1.1 404 Error has occurred, the response describe the error
 *    {
 *      "demande_state":"stock data not found !!",
 *      "err_number" : 9
 *      }
 */
router.get("/api/v1.0/equipement/stock", (req, res) => {
  try {
    STOCK.find({}, (err, reply) => {
      if (err || !reply) {
        setHeaders({ res, status: 404 }).then(() =>
          res.end(
            _JSON2STR({ err_number: 9, demande_state: ERROR_MESSAGES_EN[9] })
          )
        );
      } else {
        setHeaders({ res, status: 200 }).then(() => res.end(_JSON2STR(reply)));
      }
    });
  } catch (e) {
    console.log(e);
    setHeaders({ res, status: 450 }).then(() =>
      res.end(_JSON2STR({ err_number: 1, demande_state: ERROR_MESSAGES_EN[1] }))
    );
  }
});

router.get("/api/v1.0/equipement/comment", (req, res) => {
  try {
    COMMENT.find({}, (err, reply) => {
      if (err || !reply) {
        setHeaders({ res, status: 404 }).then(() =>
          res.end(
            _JSON2STR({ err_number: 9, demande_state: ERROR_MESSAGES_EN[9] })
          )
        );
      } else {
        setHeaders({ res, status: 200 }).then(() => res.end(_JSON2STR(reply)));
      }
    });
  } catch (e) {
    console.log(e);
    setHeaders({ res, status: 450 }).then(() =>
      res.end(_JSON2STR({ err_number: 1, demande_state: ERROR_MESSAGES_EN[1] }))
    );
  }
});

router.get("/api/v1.0/create", (req, res) => {
  const stock_insert = new STOCK();
  stock_insert.designation = "stock 1 (test)";
  stock_insert.ref = "ref 1 (test)";
  stock_insert.quantite = 10;
  stock_insert.site = "site test";
  stock_insert.emplacement = "emplacement test";
  stock_insert.save();

  const equip_insert = new EQUIPEMENT();

  equip_insert.nom = "equipement 1 (test)";
  equip_insert.QRcode = "QR456789";
  equip_insert.date_visite = Date.now();
  equip_insert.nom_constructeur = "nom constructeur";
  equip_insert.ref = "code ref";
  equip_insert.emplacement = "emplacement test";
  equip_insert.niveau_strategique = "niveau_strategique test";
  equip_insert.save();

  const preventif_insert = new PREVENTIF();

  preventif_insert.ots = "preventif 1 (test)";
  preventif_insert.id_equipement = "QR456789";
  preventif_insert.commentaire = "commentaire test";
  preventif_insert.date = Date.now();

  preventif_insert.save();

  const correctif_insert = new CORRECTIF();

  correctif_insert.description = "description 1 (test)";
  correctif_insert.id_equipement = "QR456789";
  correctif_insert.commentaire = "commentaire test";
  correctif_insert.date = Date.now();

  correctif_insert.save();

  setHeaders({ res, status: 200 }).then(() => res.end("docs created"));
});

export const equipement_Router = router;
