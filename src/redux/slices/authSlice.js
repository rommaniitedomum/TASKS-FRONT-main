import { createSlice } from "@reduxjs/toolkit";

// 초기 상태 정의
const initialState = {
  // 로컬 스토리지에 저장된 데이터가 있으면 가저오고, 없으면 null(null= logout)
  authData: JSON.parse(localStorage.getItem("authData")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // action : 기존의 authData 상태에서 action데이터를 업데이트
      state.authData = action.payload.authData;
      // 로컬 스토리지 로그인 데이터를 authData라는 키로 지정
      localStorage.setItem("authData", JSON.stringify(action.payload.authData));
    },

    logout: (state) => {
      // 로그아웃시 authData 상태 null 로 변경
      state.authData = null;
      // local storage auth data remove
      localStorage.removeItem("authData");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
