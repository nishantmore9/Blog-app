import mongoose, { Schema } from "mongoose"

const postScheme = new mongoose.Schema({
  title : {
    type : String
  },
  summary : {
    type : String
  },
  content : {
    type : String
  },
  cover : {
    type : String
  },
  author : {
    type : Schema.Types.ObjectId,
    ref : "User"
  }
}, {timestamps : true})

export const Post = mongoose.model("Post", postScheme)