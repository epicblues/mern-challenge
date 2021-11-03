import { RequestHandler } from "express";
import mongoose from "mongoose";
import { USER_ID } from "../constants";
import PostMessage, { Post } from "../models/postMessage";

export const getPosts: RequestHandler = async (req, res) => {
  try {
    const PostMessages = await PostMessage.find();

    res.status(200).json(PostMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost: RequestHandler = async (req, res) => {
  const post = req.body;
  // 폼 데이터를 받아온다.

  try {
    const newPost = await PostMessage.create({
      ...post,
      creator: req[USER_ID],
      createdAt: new Date().toISOString(),
    });
    // 실제로 db와 소통하는 부분

    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost: RequestHandler = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  // destructuring시 프로퍼티 변수명 사용하고 싶지 않을 경우 (id => _id)
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  return res.status(200).send(updatedPost);
  // new 옵션 => update된 Document를 받아온다.
};

export const deletePost: RequestHandler = async (req, res) => {
  const { id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!req["userId"]) return res.json({ message: "unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const post: Post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req["userId"]));

  if (index === -1) {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { $push: { likes: req["userId"] } },
      {
        new: true,
      }
    );
    return res.status(200).send(updatedPost);
  } else {
    // dislike a post
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { $pull: { likes: req["userId"] } },
      {
        new: true,
      }
    );
    return res.status(200).send(updatedPost);
  }
};
