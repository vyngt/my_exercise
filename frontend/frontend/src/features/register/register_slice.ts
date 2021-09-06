import { createSlice } from "@reduxjs/toolkit";

type RegisterState = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  image_base64: string;
};

export type { RegisterState };

const initialState: RegisterState = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
  image_base64: "",
};

interface SET_VALUE {
  payload: string;
}

export const register_slice = createSlice({
  name: "register",
  initialState,
  reducers: {
    set_first_name: (state, action: SET_VALUE) => {
      state.first_name = action.payload;
    },
    set_last_name: (state, action: SET_VALUE) => {
      state.last_name = action.payload;
    },
    set_username: (state, action: SET_VALUE) => {
      state.username = action.payload;
    },
    set_email: (state, action: SET_VALUE) => {
      state.email = action.payload;
    },
    set_password: (state, action: SET_VALUE) => {
      state.password = action.payload;
    },
    set_re_password: (state, action: SET_VALUE) => {
      state.confirm_password = action.payload;
    },
    set_image: (state, action: SET_VALUE) => {
      state.image_base64 = action.payload;
    },
    set_none: (state) => {
      state.first_name = "";
      state.last_name = "";
      state.username = "";
      state.email = "";
      state.password = "";
      state.confirm_password = "";
    },
  },
});

export const {
  set_first_name,
  set_last_name,
  set_username,
  set_email,
  set_password,
  set_re_password,
  set_image,
  set_none,
} = register_slice.actions;

export default register_slice.reducer;
