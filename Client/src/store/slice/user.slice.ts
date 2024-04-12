import { createSlice } from "@reduxjs/toolkit";

export interface User {
  isAuth: boolean;
  first_name: string;
  last_name: string;
  token: string;
}

export const initialUserState: User = {
  isAuth: false,
  first_name: "",
  last_name: "",
  token: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login(state, action) {
      const { first_name, last_name, token } = action.payload;
      if (!token) return;
      state.isAuth = true;
      state.first_name = first_name;
      state.last_name = last_name;
      state.token = token;
    },
    logout(state) {
      state.isAuth = false;
      state.first_name = "";
      state.last_name = "";
      state.token = "";
    },
  },
});

export const UserAction = UserSlice.actions;
export default UserSlice.reducer;
