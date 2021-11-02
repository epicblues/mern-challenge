import { Reducer } from "redux";
import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer: Reducer = (state, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null };
    default:
      return { authData: null };
    // 반드시 default로 return 하는 것이 있어야 한다.
  }
};

export default authReducer;
