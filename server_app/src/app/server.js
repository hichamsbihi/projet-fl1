
const express = require('express');
const path = require('path');

import { SERVER_HOST, SERVER_PORT } from '../config/app';
// import {dbService} from '../config/db_connect';
import {_router} from "../routes/middlewares";
import {auth_Router} from '../routes/authentification';
import {user_Router}  from '../routes/user';

const app = express();

const server = app.listen(SERVER_PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`);
});

app.use('/Apidocs', express.static(path.join(__dirname, 'docs')));

app.use(_router);




