import { Action, ActionCreator, AnyAction, Dispatch } from "redux";
import * as api from "../api"; // 모든 named exports를 접근하는 객체명을 api로 정의
import { PostType } from "../components/Form/Form";

// Action Creators

// async logic을 수행하기 위해 redux-thunk 사용. dispatch를 매개변수로 받는다.

export const getPosts = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    // Axios로 받은 response에는 data property가 반드시 존재한다. 따라서 구조 분해 할당이 가능하다.
    dispatch({ type: "FETCH_ALL", payload: data });
    // payload => 전달할 본문 데이터. 여기서는 Posts
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (newPost: PostType) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.createPost(newPost);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
