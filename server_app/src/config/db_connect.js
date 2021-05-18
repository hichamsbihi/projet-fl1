const mongoose = require('mongoose');
import {DB_DSL} from './app'

mongoose.connect(
    DB_DSL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) console.log("Database connection error =>" + err);
    else console.log('Server connected to Database with DSL => ' + DB_DSL);
  },
);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);