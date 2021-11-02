import { combineReducers } from "redux";

import posts from "./posts";
import auth from "./auth";

// 여러 Reducer를 합쳐서 Redux에 적용시키기 위한 함수
export default combineReducers({
  posts,
  auth,
});
