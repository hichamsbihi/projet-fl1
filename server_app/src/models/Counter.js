/* Requires */
import mongoose from "mongoose";

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
const schema = mongoose.Schema;


/* COUNTER model definition */
const Counter = new schema(
  {
    sequanceName: String,
    sequanceCounter: Number,
  },
  { collection: 'Counter' },
);


Counter.methods.getNextSequenceValue = (SequenceName, callback) => {
  try {
    _COUNTER.findOneAndUpdate(
      {
        sequanceName: SequenceName,
      },
      {
        $inc: { sequanceCounter: 1 },
      },
      {
        new: true,
      },
      (err, res) => {
        if (res) {
          callback(null, res.sequanceCounter);
        } else {
          const count = new _COUNTER({
            sequanceName: SequenceName,
            sequanceCounter: 1,
          });
          count.save({ new: true }, (err, res) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, 1);
            }
          });
        }
      },
    );
  } catch (e) {
    console.log('error on the connection with the DB');
    callback(err, null);
  }
};
const _COUNTER = mongoose.model('Counter', Counter);


export const COUNTER = _COUNTER ;
