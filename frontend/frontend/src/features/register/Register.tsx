import React from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RegisterState } from "./register_slice";

import {
  set_first_name,
  set_last_name,
  set_username,
  set_email,
  set_password,
  set_re_password,
  set_image,
  set_none,
} from "./register_slice";

import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { FaceID } from "../face_capture";

const Register = () => {
  // Define
  const [reg_success, setReg_success] = React.useState(0);

  const register = useAppSelector((state) => state.register);
  const dispatch = useAppDispatch();

  const { first_name, last_name, username, email, password, confirm_password } =
    register;

  const arr_label = [
    "f_name",
    "l_name",
    "username",
    "email",
    "password",
    "re_password",
  ];
  const arr_type = ["text", "text", "text", "text", "password", "password"];
  const arr_func = [
    set_first_name,
    set_last_name,
    set_username,
    set_email,
    set_password,
    set_re_password,
  ];
  const arr_value = [
    first_name,
    last_name,
    username,
    email,
    password,
    confirm_password,
  ];
  const arr_child = [
    "First Name",
    "Last Name",
    "Username",
    "Email",
    "Password",
    "Confirm Password",
  ];

  const SendRegistration = () => {
    const data: RegisterState = register;

    if (data.password === data.confirm_password) {
      const url: string = "http://127.0.0.1:8000/api/register/";
      const form_data = new FormData();

      const data_cv: Record<string, string> = data;

      for (let key in data_cv) {
        form_data.append(key, data_cv[key]);
      }

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(url, form_data, config)
        .then(() => {
          setReg_success(1);
        })
        .catch(() => setReg_success(2));
    } else {
      console.log("Password not matched");
    }
    dispatch(set_none());
  };

  // End define

  React.useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <div>
      <h1>Register</h1>
      {reg_success === 0 ? (
        <form>
          {arr_label.map((label, index) => (
            <InputField
              label={label}
              type_input={arr_type[index]}
              action={arr_func[index]}
              value={arr_value[index]}
              key={label}
            >
              {arr_child[index]}
            </InputField>
          ))}
          <FaceID action={set_image} />
          <button id="register-btn" type="button" onClick={SendRegistration}>
            Register
          </button>
        </form>
      ) : reg_success === 1 ? (
        <p>Success</p>
      ) : (
        <p>Failed</p>
      )}
    </div>
  );
};

const InputField: React.FC<{
  label: string;
  type_input: string;
  value: string;
  action: ActionCreatorWithPayload<string, string>;
  children: string;
}> = ({ label, type_input, value, action, children }) => {
  const dispatch = useAppDispatch();

  return (
    <label htmlFor={label}>
      {children}:
      <input
        id={label}
        type={type_input}
        value={value}
        onChange={(e) => dispatch(action(e.target.value))}
      />
    </label>
  );
};

export default Register;
