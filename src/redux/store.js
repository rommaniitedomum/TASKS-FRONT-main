// combinereducers 리듀서 하나로 뭉치기
// configureStore 스토어를 생성하는 함수
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import apiReducer from "./slices/apiSlice";
import modalReducer from "./slices/modalSlice";

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    apis: apiReducer,
    modal: modalReducer,
  }),
});

export default store;
