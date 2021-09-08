import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import axios from "axios";

import {
  set_logged,
  set_username_log,
  set_password_log,
  set_access_token,
  set_refresh_token,
  // set_logout,
} from "./auth_slice";
const LoginPassword = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [sending, setSending] = React.useState(false);
  const [log_fail, set_log_fail] = React.useState(false);

  const PasswordLogin = () => {
    setSending(true);
    const url: string = "http://127.0.0.1:8000/api/login-password/";
    const data = { username: auth.username, password: auth.password };

    axios
      .post(url, data)
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
    document.title = "Password Login";
  }, []);

  return auth.loggedIn ? (
    <p style={{ color: "green" }}>
      <strong>Success</strong>
    </p>
  ) : (
    <div>
      <form>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            id="username"
            value={auth.username}
            onChange={(e) => dispatch(set_username_log(e.currentTarget.value))}
          />
        </label>
        <p></p>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            value={auth.password}
            onChange={(e) => dispatch(set_password_log(e.currentTarget.value))}
          />
        </label>
        <button type="button" onClick={PasswordLogin}>
          {sending ? "Please wait..." : "Login"}
        </button>
        {log_fail ? (
          <p style={{ color: "red" }}>
            <strong>Wrong password or username!!!</strong>
          </p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default LoginPassword;
