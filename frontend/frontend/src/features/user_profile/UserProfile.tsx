import React from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  set_username,
  set_email,
  set_first_name,
  set_last_name,
  set_active,
} from "./user_profile_slice";

const UserProfile = () => {
  React.useEffect(() => {
    document.title = "User Profile";
  }, []);

  const [loading, setLoading] = React.useState(false);
  const access_token = useAppSelector((state) => state.auth.access_token);
  const active = useAppSelector((state) => state.user_profile.active);
  const dispatch = useAppDispatch();

  const get_user_data = () => {
    setLoading(true);
    const url: string = "http://127.0.0.1:8000/api/profile/";
    const token = `Bearer ${access_token}`;
    const config = {
      headers: { Authorization: token },
    };
    axios
      .get(url, config)
      .then((response) => {
        const data = response.data;
        dispatch(set_username(data["username"]));
        dispatch(set_email(data["email"]));
        dispatch(set_first_name(data["first_name"]));
        dispatch(set_last_name(data["last_name"]));
        dispatch(set_active(true));
        setLoading(false);
      })
      .catch(() => {
        dispatch(set_active(false));
        setLoading(false);
      });
  };

  return (
    <div>
      <h3>User Profile</h3>
      <div>
        {active ? <Info /> : "None"}
        <button type="button" onClick={get_user_data}>
          {loading ? "Please Wait..." : "Get"}
        </button>
      </div>
    </div>
  );
};

const Info = () => {
  const profile = useAppSelector((state) => state.user_profile);
  return (
    <div>
      <p>First Name: {profile.first_name}</p>
      <p>Last Name: {profile.last_name}</p>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default UserProfile;
