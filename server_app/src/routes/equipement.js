import { Router } from "express";

import { setHeaders } from "./middlewares.js";
import { ERROR_MESSAGES_EN, SUCCESS_MESSAGES_EN } from "../core/constants.js";
import {
  EQUIPEMENT,
  CORRECTIF,
  PREVENTIF,
  STOCK,
  COMMENT,
  FIABILISATION,
  DOCUMENTATION,
  QSSE,
  SCHEMA,
  MESURE,
} from "../models/equipement.js";
// import {equipementSerializer} from "../serializers/equipement_serializer.js";

const router = Router();
const _JSON2STR = JSON.stringify;

// router.use(bodyParser.urlencoded({ extended: true }));

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
router.post("/api/v1.0/equipements", (req, res) => {
  EQUIPEMENT.deleteMany({}, (err, reply) => {
    if (!err) {
      EQUIPEMENT.create(req.body.arrayData);
      setHeaders({ res, status: 200 }).then(() =>
        res.end("Equipements data have been added")
      );
    } else {
      setHeaders({ res, status: 404 }).then(() =>
        res.end("Error was occurred")
      );
    }
  });
});

router.post("/api/v1.0/equipement/documentation", (req, res) => {
  DOCUMENTATION.deleteMany({}, (err, reply) => {
    if (!err) {
      DOCUMENTATION.create(req.body.arrayData);
      setHeaders({ res, status: 200 }).then(() =>
        res.end("DOCUMENTATION data have been added")
      );
    } else {
      setHeaders({ res, status: 404 }).then(() =>
        res.end("Error was occurred")
      );
    }
  });
});

router.post("/api/v1.0/equipement/schema", (req, res) => {
  console.log("test");
  SCHEMA.deleteMany({}, (err, reply) => {
    if (!err) {
      SCHEMA.create(req.body.arrayData);
      setHeaders({ res, status: 200 }).then(() =>
        res.end("SCHEMA data have been added")
      );
    } else {
      setHeaders({ res, status: 404 }).then(() =>
        res.end("Error was occurred")
      );
    }
  });
});

router.post("/api/v1.0/equipement/qssedata", (req, res) => {
  QSSE.deleteMany({}, (err, reply) => {
    if (!err) {
      QSSE.create(req.body.arrayData);
      setHeaders({ res, status: 200 }).then(() =>
        res.end("QSSE data have been added")
      );
    } else {
      setHeaders({ res, status: 404 }).then(() =>
        res.end("Error was occurred")
      );
    }
  });
});

router.post("/api/v1.0/equipement/mesures", (req, res) => {
  MESURE.create(req.body.arrayData);
  setHeaders({ res, status: 200 }).then(() =>
    res.end("Mesures data have been added")
  );
});

router.post("/api/v1.0/stock", (req, res) => {
  STOCK.deleteMany({}, (err, reply) => {
    if (!err) {
      STOCK.create(req.body.arrayData);
      setHeaders({ res, status: 200 }).then(() =>
        res.end("Equipements data have been added")
      );
    } else {
      setHeaders({ res, status: 404 }).then(() =>
        res.end("Error was occurred")
      );
    }
  });
});
router.post("/api/v1.0/preventifs", (req, res) => {
  PREVENTIF.deleteMany({}, (err, reply) => {
    if (!err) {
      PREVENTIF.create(req.body.arrayData);
      setHeaders({ res, status: 200 }).then(() =>
        res.end("preventifs data have been added")
      );
    } else {
      setHeaders({ res, status: 404 }).then(() =>
        res.end("Error was occurred")
      );
    }
  });
});
router.post("/api/v1.0/correctifs", (req, res) => {
  CORRECTIF.deleteMany({}, (err, reply) => {
    if (!err) {
      CORRECTIF.create(req.body.arrayData);
      setHeaders({ res, status: 200 }).then(() =>
        res.end("correctifs data have been added")
      );
    } else {
      setHeaders({ res, status: 404 }).then(() =>
        res.end("Error was occurred")
      );
    }
  });
});

router.post("/api/v1.0/comment", (req, res) => {
  !req.body.QRcode &&
    setHeaders({ res, status: 450 }).then(() =>
      res.end(
        _JSON2STR({ err_number: 11, demande_state: ERROR_MESSAGES_EN[11] })
      )
    );

  if (req.body.QRcode) {
    let newComment = COMMENT();
    newComment.id_equipement = req.body.QRcode;
    newComment.commentaire = req.body.commentaire;
    newComment.nom_technicien = req.body.nom_technicien;
    newComment.save((err, reply) => {
      err &&
        setHeaders({ res, status: 404 }).then(() =>
          res.end("Error was occurred")
        );
      reply &&
        setHeaders({ res, status: 200 }).then(() =>
          res.end("comment has been added")
        );
    });
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

router.post("/api/v1.0/equipement/comment", (req, res) => {
  try { 
    console.log('test');
    const comment_insert = new COMMENT();
    comment_insert.id_equipement = req.body.id_equipement;
    comment_insert.commentaire = req.body.commentaire;
    comment_insert.gamme = req.body.gamme;
    comment_insert.num_operation = req.body.num_operation;
    comment_insert.nom_technicien = req.body.nom_technicien;

    comment_insert.save();
    setHeaders({ res, status: 200 }).then(() =>
      res.end("comment has been saved")
    );
  } catch (e) {
    console.log(e);
    setHeaders({ res, status: 450 }).then(() =>
      res.end(_JSON2STR({ err_number: 1, demande_state: ERROR_MESSAGES_EN[1] }))
    );
  }
});

router.post("/api/v1.0/equipement/fiabilisation", (req, res) => {
  try {
    const fiab_insert = new FIABILISATION();
    fiab_insert.id_equipement = req.body.id_equipement;
    fiab_insert.commentaire = req.body.commentaire;
    fiab_insert.nom_technicien = req.body.nom_technicien;
    fiab_insert.date = Date.now();
    fiab_insert.image = req.body.image;
    fiab_insert.save();
    setHeaders({ res, status: 200 }).then(() =>
      res.end("fiabilisation row has been saved")
    );
  } catch (e) {
    console.log(e);
    setHeaders({ res, status: 450 }).then(() =>
      res.end(_JSON2STR({ err_number: 1, demande_state: ERROR_MESSAGES_EN[1] }))
    );
  }
});

router.get("/api/v1.0/equipement/fiabilisation", (req, res) => {
  try {
    FIABILISATION.find({}, { image: false }, (err, reply) => {
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

router.get("/api/v1.0/equipement/documentation", (req, res) => {
  try {
    DOCUMENTATION.find(
      {
        id_equipement: req.query.id_equipement,
        type: req.query.type,
      },
      (err, reply) => {
        if (err || !reply) {
          setHeaders({ res, status: 404 }).then(() =>
            res.end(
              _JSON2STR({ err_number: 9, demande_state: ERROR_MESSAGES_EN[9] })
            )
          );
        } else {
          setHeaders({ res, status: 200 }).then(() =>
            res.end(_JSON2STR(reply))
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

router.get("/api/v1.0/equipement/mesures/:id", (req, res) => {
  try {
    MESURE.find(
      {
        id_equipement: req.params.id,
      },
      (err, reply) => {
        if (err || !reply) {
          setHeaders({ res, status: 404 }).then(() =>
            res.end(
              _JSON2STR({ err_number: 9, demande_state: ERROR_MESSAGES_EN[9] })
            )
          );
        } else {
          setHeaders({ res, status: 200 }).then(() =>
            res.end(_JSON2STR(reply))
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

router.get("/api/v1.0/equipement/qssedata", (req, res) => {
  try {
    QSSE.find(
      {
        id_equipement: req.query.id_equipement,
      },
      (err, reply) => {
        if (err || !reply) {
          setHeaders({ res, status: 404 }).then(() =>
            res.end(
              _JSON2STR({ err_number: 9, demande_state: ERROR_MESSAGES_EN[9] })
            )
          );
        } else {
          setHeaders({ res, status: 200 }).then(() =>
            res.end(_JSON2STR(reply))
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

router.get("/api/v1.0/equipement/schema", (req, res) => {
  try {
    SCHEMA.find(
      {
        id_equipement: req.query.id_equipement,
        type: req.query.type,
      },
      (err, reply) => {
        if (err || !reply) {
          setHeaders({ res, status: 404 }).then(() =>
            res.end(
              _JSON2STR({ err_number: 9, demande_state: ERROR_MESSAGES_EN[9] })
            )
          );
        } else {
          setHeaders({ res, status: 200 }).then(() =>
            res.end(_JSON2STR(reply))
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
  equip_insert.nom_constructeur = "GOUPIL";
  equip_insert.ref = "VRWG3SNBCD0000314";
  equip_insert.emplacement = "VV-EQUIPES-PE";
  equip_insert.niveau_strategique = "IMPORTANT";
  equip_insert.image_equipement =
    "https://drive.google.com/file/d/1m1bJ4-LKHArO8fQx1N_wKNeRA_naJi2S/view?usp=sharing";
  equip_insert.Qsse_pdf =
    "https://drive.google.com/file/d/10rCeSDYzdhmQZjUvo1rEuX2uCJgkQ_aq/view?usp=sharing";
  equip_insert.constructeur_pdf =
    "https://drive.google.com/file/d/1SJ977XuxOm4_9TLrU4dxmU32Tu12-f61/view?usp=sharing";
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

  const schema_insert = new SCHEMA();

  schema_insert.description = "description 1 (test)";
  schema_insert.id_equipement = "QR456789";
  schema_insert.type = "commentaire test";
  schema_insert.document_pdf = "document_pdf lien test";
  schema_insert.save();

  const documentation_insert = new DOCUMENTATION();

  documentation_insert.description = "description 1 (test)";
  documentation_insert.id_equipement = "QR456789";
  documentation_insert.type = "commentaire test";
  documentation_insert.document_pdf = "document_pdf lien test";

  documentation_insert.save();

  const qsse_insert = new QSSE();

  qsse_insert.description = "description 1 (test)";
  qsse_insert.id_equipement = "QR456789";
  qsse_insert.type = "commentaire test";
  qsse_insert.document_pdf = "document_pdf lien test";

  qsse_insert.save();

  setHeaders({ res, status: 200 }).then(() => res.end("docs created"));
});

export const equipement_Router = router;
