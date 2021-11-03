import axios from "axios";
import { PostType } from "../components/Form/Form";
import { UserVo } from "../model";

const url =
  process.env.REACT_APP_LOCAL_URL || "https://kms-mern-practice.herokuapp.com/";
// url pointing to backend route

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    return {
      ...req,
      headers: {
        ...req.headers,
        Authorization: `Bearer ${JSON.parse(profile).token}`,
      },
    };
  }
  return req;
});
// 기본 url 설정 axios 인스턴스
// interceptor 객체를 request가 호출될 때마다 작동하는 함수를 통해 request를 세팅할 수 있다.

export const fetchPosts = () => API.get("posts");

export const createPost = (newPost: PostType) => API.post("posts", newPost);

export const updatePost = (id: string, post: PostType) =>
  API.patch(`posts/${id}`, post);

export const deletePost = (id: string) =>
  API.delete("posts", {
    data: { id },
  });

export const likePost = (id: string) =>
  API.patch(`posts/${id}/likePost`, undefined);

export const signUp = (user: UserVo) => API.post("user/signup", user);
export const signIn = (user: UserVo) => API.post("user/signin", user);
// 모든 backend action은 Redux에서 이루어진다.
