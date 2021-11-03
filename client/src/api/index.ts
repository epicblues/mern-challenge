import axios from "axios";
import { PostType } from "../components/Form/Form";
import { UserVo } from "../model";

const url =
  process.env.REACT_APP_LOCAL_URL || "https://kms-mern-practice.herokuapp.com/";
// url pointing to backend route

export const fetchPosts = () => axios.get(url + "posts");

export const createPost = (newPost: PostType) =>
  axios.post(url + "posts", newPost);

export const updatePost = (id: string, post: PostType) =>
  axios.patch(url + `/${id}`, post);

export const deletePost = (id: string) =>
  axios.delete(url + "posts", { data: { id } });

export const likePost = (id: string) =>
  axios.patch(`${url}posts/${id}/likePost`);

export const signUp = (user: UserVo) => axios.post(url + "user/signup", user);
export const signIn = (user: UserVo) => axios.post(url + "user/signin", user);

// 모든 backend action은 Redux에서 이루어진다.
