
const express = require('express');
const path = require('path');

const CONSTANTS = require('../core/constants');
const configApp = require('../config/app');
const db_service = require('../config/db_connect');
const middlewares = require('../routes/middlewares');
// const auth = require('../routes/authentication');
const userRouter = require('./routes/user');
const app = express();

const server = app.listen(configApp.port, (err) => {
  if (err) throw err;
  console.log(`Server is running on http://${configApp.host}:${configApp.port}`);
});

app.use('/Apidocs', express.static(path.join(__dirname, 'docs')));

app.use(middlewares.router);
app.use(auth.router);
app.use(userRouter.router);


app.use((error, req, res, next) => {
  if (error instanceof SyntaxError) {
    res.writeHead(450, { 'content-type': 'text/json' });
    res.end('{"demande_state":"Please verify the syntax of your request !!"}');
  } else {
    next();
  }
});
