import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FaceID } from "../face_capture";
import axios from "axios";

import {
  set_logged,
  set_username_log,
  set_image_base64_log,
  set_access_token,
  set_refresh_token,
} from "./auth_slice";

const LoginFaceID = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [sending, setSending] = React.useState(false);
  const [log_fail, set_log_fail] = React.useState(false);

  const FaceLogin = () => {
    setSending(true);
    const url: string = "http://127.0.0.1:8000/api/login-face/";
    const form_data = new FormData();
    form_data.append("username", auth.username);
    form_data.append("img", auth.image_base64);

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
          setSending(false);
          set_log_fail(false);
        }
      })
      .catch(() => {
        setSending(false);
        set_log_fail(true);
      });
  };

  React.useEffect(() => {
    document.title = "FaceID Login";
  }, []);

  return auth.loggedIn ? (
    <p style={{ color: "green" }}>
      <strong>Success</strong>
    </p>
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
        <button type="button" onClick={FaceLogin}>
          {sending ? "Please wait..." : "Login"}
        </button>
        {log_fail ? (
          <p style={{ color: "red" }}>
            <strong>Wrong FaceID or username!!!</strong>
          </p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default LoginFaceID;
