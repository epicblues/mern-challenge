import express from "express";
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
} from "../controllers/posts";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/", deletePost);

export default router;
