import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"

const salt = bcrypt.genSaltSync(10);

const registerUser = async (req, res) => {
  const {username, password, email} = req.body
  try {
    const userDoc = await User.create({
      username,
      email,
      password : bcrypt.hashSync(password, salt)
    })
    res.json(userDoc)

  } catch (error) {
    res.status(401).json(error)
  }
  // res.json({username, password, email})
}

const loginUser = async (req, res) => {
  const {username, password} = req.body
  try {
    const userDoc = await User.findOne({username})
    const isPasswordCorrect = bcrypt.compareSync(password,userDoc.password)
    // const { password, ...rest} = userDoc._doc
    if(isPasswordCorrect) {
      jwt.sign({username, id : userDoc._id}, process.env.JWT_SECRET, {}, (err,token)=> {
        if (err) throw err
        res.cookie("token", token).json({
          id:userDoc._id,
          username
        })
      })
    }
  } catch (error) {
    res.status(400).json("Invalid credentials")
  }
}

const getProfile = async (req,res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(200).json(info);
  });
}

const logoutUser = async (req, res) => {
  res.cookie('token', '').json('ok')
}

export { registerUser, loginUser, getProfile, logoutUser}