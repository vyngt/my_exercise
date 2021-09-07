import { configureStore } from "@reduxjs/toolkit";
import register_reducer from "../features/register/register_slice";
import auth_reducer from "../features/auth/auth_slice";
import user_profile_reducer from "../features/user_profile/user_profile_slice";

const store = configureStore({
  reducer: {
    register: register_reducer,
    auth: auth_reducer,
    user_profile: user_profile_reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
