import { Router } from "express";
import multer from "multer"
import { addPost, updatePost, getPosts, openPost } from "../controllers/user.controller.js";

const upload = multer({ dest: 'uploads/' })

const router = Router()

router.route("/post").post(upload.single('file'),addPost)
router.route("/post").put(upload.single('file'),updatePost)
router.route("/post").get(getPosts)
router.route("/post/:id").get(openPost)

export default router