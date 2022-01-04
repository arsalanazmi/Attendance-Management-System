import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import employeeReducer from "./employeeReducer";

export default combineReducers({
  admin: adminReducer,
  employee: employeeReducer
});
