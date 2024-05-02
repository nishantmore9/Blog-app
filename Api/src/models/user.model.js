import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
  username : {
    type  : String,
    required : true,
    unique : true,
    min : 4
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  }
})

export const User = mongoose.model("User", userScheme)