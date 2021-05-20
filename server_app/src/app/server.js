
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

import { SERVER_HOST, SERVER_PORT } from '../config/app.js';

import {dbService} from '../config/db_connect.js';
import {_router} from "../routes/middlewares.js";
import {auth_Router} from '../routes/authentification.js';
import {user_Router}  from '../routes/user.js';

const app = express();

const server = app.listen(SERVER_PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`);
});

//we need to change up how __dirname is used for ES6 purposes
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/Apidocs', express.static(path.join(__dirname, 'docs')));

app.use(_router);
app.use(auth_Router);
app.use(user_Router);




