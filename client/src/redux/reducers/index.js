import { combineReducers } from "redux";
import auth from "./auth";
import messages from "./messages";
import destination from "./destination";

export default combineReducers({ auth, messages, destination });