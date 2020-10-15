import { combineReducers } from "redux";
import auth from "./auth";
import exercise from "./exercise";

export default combineReducers({
    auth,
    exercise
})