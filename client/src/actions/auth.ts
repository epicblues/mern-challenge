import { History } from "history";
import { UserVo } from "../model";
import { Dispatch } from "redux";
import * as api from "../api"; // 모든 named exports를 접근하는 객체명을 api로 정의
import { PostType } from "../components/Form/Form";
import { AUTH } from "../constants/actionTypes";

export const signin =
  (formData: UserVo, history: History<unknown>) =>
  async (dispatch: Dispatch) => {
    try {
      // login the user
      const { data } = await api.signIn(formData);

      dispatch({ type: AUTH, data });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

export const signup =
  (formData: UserVo, history: History<unknown>) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.signUp(formData);
      dispatch({ type: AUTH, data });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
