const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    ID: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
      type:String
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports= User;