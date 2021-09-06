import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  loggedIn: boolean;
  username: string;
  password: string;
  image_base64: string;
  access_token: string;
  refresh_token: string;
};

export type { AuthState };

const initialState = {
  loggedIn: false,
  username: "",
  password: "",
  image_base64: "",
  access_token: "",
  refresh_token: "",
};

interface SET_AUTH_VALUE {
  payload: string;
}

export const auth_slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    set_logged: (state) => {
      state.loggedIn = true;
    },
    set_logout: (state) => {
      state.loggedIn = false;
      state.access_token = "";
      state.refresh_token = "";
      state.username = "";
      state.password = "";
      state.image_base64 = "";
    },
    set_username_log: (state, action: SET_AUTH_VALUE) => {
      state.username = action.payload;
    },
    set_password_log: (state, action: SET_AUTH_VALUE) => {
      state.password = action.payload;
    },
    set_image_base64_log: (state, action: SET_AUTH_VALUE) => {
      state.image_base64 = action.payload;
    },
    set_access_token: (state, action: SET_AUTH_VALUE) => {
      state.access_token = action.payload;
    },
    set_refresh_token: (state, action: SET_AUTH_VALUE) => {
      state.refresh_token = action.payload;
    },
  },
});

export const {
  set_logged,
  set_logout,
  set_username_log,
  set_password_log,
  set_image_base64_log,
  set_access_token,
  set_refresh_token,
} = auth_slice.actions;

export default auth_slice.reducer;
