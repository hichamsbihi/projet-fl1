import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors';

import { SERVER_HOST, SERVER_PORT } from "../config/app.js";

import {dbService} from '../config/db_connect.js';
import {_router} from "../routes/middlewares.js";
import {auth_Router} from '../routes/authentification.js';
import {user_Router}  from '../routes/user.js';
import {equipement_Router}  from '../routes/equipement.js';
import {statics_router}  from '../routes/staticRendering.js';
import bodyParser from "body-parser";

const app = express();

const server = app.listen(SERVER_PORT, (err) => {
  if (err) throw err;
  console.log("last version 29/07/2021");
  console.log("the last push is comming after this last veriosn of the code !! ") // noted by zak
  
  console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`);
});

//we need to change up how __dirname is used for ES6 purposes
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json({limit: '200mb'}));
app.use(cors());
app.use("/apidocs", express.static(path.join(__dirname, "../../doc")));
app.use(_router);
app.use(auth_Router);
app.use(user_Router);
app.use(equipement_Router);
app.use(statics_router);
