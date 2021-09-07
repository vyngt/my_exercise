import { createSlice } from "@reduxjs/toolkit";

type UserProfile = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  active: boolean;
};

export type { UserProfile };

const initialState: UserProfile = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  active: false,
};

interface SET_VALUE {
  payload: string;
}

interface SET_ACTIVE {
  payload: boolean;
}

export const user_profile_slice = createSlice({
  name: "user_profile",
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
    set_active: (state, action: SET_ACTIVE) => {
      state.active = action.payload;
    },
    set_none: (state) => {
      state.first_name = "";
      state.last_name = "";
      state.username = "";
      state.email = "";
      state.active = false;
    },
  },
});

export const {
  set_first_name,
  set_last_name,
  set_username,
  set_email,
  set_active,
  set_none,
} = user_profile_slice.actions;

export default user_profile_slice.reducer;
