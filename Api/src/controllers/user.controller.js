import jwt from "jsonwebtoken"
import { Post } from "../models/post.model.js"
import fs from "fs"

const addPost = async(req, res) => {
  const {originalname, path} = req.file
  console.log(req.file)
  const parts = originalname.split('.')
  const ext = parts[parts.length - 1]
  const newPath = path+'.'+ext
  fs.renameSync(path, newPath)
  
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }

    const {title, summary, content} = req.body
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover : newPath,
      author : info.id
    })
    res.json(postDoc) 
  });
}

const updatePost = async(req, res) => {
  let newPath = null
  if(req.file) {
    const {originalname, path} = req.file
    console.log(req.file)
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    newPath = path+'.'+ext
    fs.renameSync(path, newPath)
  }

  const {token} = req.cookies
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }
    const {id, title, summary, content} = req.body
    const postDoc = await Post.findById(id)
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
    if(!isAuthor) {
      res.status(400).json("You are not author")
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover
    })
    res.status(200).json(postDoc)
  });
}

const getPosts = async(req, res) => {
  res.status(200).json(
    await Post.find()
      .populate("author", ["username"])
      .sort({createdAt : -1})
      .limit(20)
  )
}

const openPost = async(req, res) => {
  const {id} = req.params
  const postDoc = await Post.findById(id).populate("author", ["username"])
  res.json(postDoc)
}

export {addPost, updatePost, getPosts, openPost}