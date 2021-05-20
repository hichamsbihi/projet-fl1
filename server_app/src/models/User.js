import mongoose from "mongoose";

import {COUNTER} from "./Counter.js";



const UserSchema = new mongoose.Schema({
    _id: {type: String},
    name: String,
    email: { type: String, lowercase: true,unique : true, required : true },
    password: String,
    isActive: { type: Boolean,default: false },
    tele: { type: String, unique: true, required: false },
    inscription_Date: { type: Date },
  },
  { collection: 'User' },
);

UserSchema.statics.GetProfile = function (idUser, callback) {
  try {
    const query = { _id: idUser };
    User.findOne(query, (err, result) => {
      if (err) {
        callback('Profile with the specified ID is not found', null);
      } else {
        if (result) result.password = 'no access to the password';
        callback(null, result);
      }
    });
  } catch (e) {
    callback(e, null);
  }
};

UserSchema.methods.AddUser = async function (callback) {
  const counter = new COUNTER();
  await counter.getNextSequenceValue('user', (err, res) => {
    console.log(err,res);

    if (err) callback(err, null);
    else {
      this._id = `U${res}`;
      console.log("here");
      console.log(res);
      this.save((err, result) => {
        if (err) callback(err, null);
        else {
          console.log('User inserted');
          callback(null, `U${res}`);
        }
      });
    }
  });
};


const User = new mongoose.model("User", UserSchema);

export const USER = User;


