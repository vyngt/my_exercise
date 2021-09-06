import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AuthState } from "./auth_slice";
import { FaceID } from "../face_capture";
import axios from "axios";

import {
  set_logged,
  set_username_log,
  set_image_base64_log,
  set_access_token,
  set_refresh_token,
  // set_logout,
} from "./auth_slice";

const FaceLogin = (
  data: AuthState,
  dispatch: any,
  setState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setState(true);
  const url: string = "http://127.0.0.1:8000/api/login-face/";
  const form_data = new FormData();
  form_data.append("username", data.username);
  form_data.append("img", data.image_base64);

  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  axios
    .post(url, form_data, config)
    .then((response) => {
      if (response.data !== null) {
        dispatch(set_logged());
        dispatch(set_access_token(response.data["access"]));
        dispatch(set_refresh_token(response.data["refresh"]));
        setState(false);
      }
    })
    .catch(() => {
      setState(false);
    });
};

const LoginFaceID = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [sending, setSending] = React.useState(false);

  React.useEffect(() => {
    document.title = "FaceID Login";
  }, [auth.loggedIn]);
  return auth.loggedIn ? (
    <div>Success</div>
  ) : (
    <div>
      <form>
        <label>
          Username:
          <input
            type="text"
            id="username"
            value={auth.username}
            onChange={(e) => dispatch(set_username_log(e.currentTarget.value))}
          />
        </label>
        <FaceID action={set_image_base64_log} />
        <button
          type="button"
          onClick={() => FaceLogin(auth, dispatch, setSending)}
        >
          {sending ? "Please wait..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginFaceID;
