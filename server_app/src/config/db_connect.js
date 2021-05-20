
import mongoose from 'mongoose';

import {DB_DSL} from './app.js';
import {ERROR_MESSAGES_EN,SUCCESS_MESSAGES_EN} from "../core/constants.js";

mongoose.connect(
    DB_DSL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) console.log(ERROR_MESSAGES_EN[2] + err);
    else console.log(SUCCESS_MESSAGES_EN[2] + DB_DSL);
  },
);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

export const dbService="";