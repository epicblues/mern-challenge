import express from "express";

import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  likePost,
} from "../controllers/posts";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", getPosts);

// 미들웨어 탑재
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
