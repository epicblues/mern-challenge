import axios from "axios";
import { PostType } from "../components/Form/Form";

const url = "http://localhost:5000/posts";
// url pointing to backend route

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost: PostType) => axios.post(url, newPost);

// 모든 backend action은 Redux에서 이루어진다.
