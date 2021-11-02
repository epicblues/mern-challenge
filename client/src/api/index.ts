import axios from "axios";
import { PostType } from "../components/Form/Form";

const url =
  process.env.REACT_APP_LOCAL_URL ||
  "https://kms-mern-practice.herokuapp.com/posts";
// url pointing to backend route

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost: PostType) => axios.post(url, newPost);

export const updatePost = (id: string, post: PostType) =>
  axios.patch(url + `/${id}`, post);

export const deletePost = (id: string) => axios.delete(url, { data: { id } });

export const likePost = (id: string) => axios.patch(`${url}/${id}/likePost`);

// 모든 backend action은 Redux에서 이루어진다.
