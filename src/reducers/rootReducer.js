import changeColor from "./ThemeColors";
import { combineReducers } from "@reduxjs/toolkit";
const rootReducer = combineReducers({
    changeColor:changeColor
});
export default rootReducer;