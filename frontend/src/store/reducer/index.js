import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

const reducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
});

export default reducer;
