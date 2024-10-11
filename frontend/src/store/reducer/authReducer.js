import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SET_CURRENT_USER
} from "../action/actionTypes";

const initialState = {
  token: localStorage.getItem("jwtToken"),
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
