import { Reducer } from "redux";
import { CREATE, DELETE, FETCH_ALL, UPDATE } from "../constants/actionTypes";
import { PostVo } from "../model";

const postReducer: Reducer = (posts: any[] = [], action) => {
  // state = [] 는 초기값 설정
  // action의 type에 따라 다양한 로직을 수행한다.

  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    // action의 payload에 세팅된 fetch된 값을 state로 반영한다.
    case CREATE:
      return [...posts, action.payload];
    case DELETE:
      return posts.filter((post: PostVo) => post._id !== action.payload);
    case UPDATE:
      return posts.map((post: PostVo) =>
        post._id === action.payload._id ? action.payload : post
      );
    default:
      return posts;
  }
};

export default postReducer;
