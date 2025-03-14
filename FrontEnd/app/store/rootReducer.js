import { combineReducers } from "@reduxjs/toolkit";
import apiReducer from "./slices/apiSlice";

const rootReducer = combineReducers({
  products: apiReducer,
});

export default rootReducer;
