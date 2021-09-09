import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { set_logout } from "../auth/auth_slice";
import { remove_profile_status } from "../user_profile/user_profile_slice";

const ResetButton: React.FC<{}> = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(set_logout());
    dispatch(remove_profile_status());
  };

  return (
    <Link to="#" onClick={handleClick}>
      Reset Status
    </Link>
  );
};

export default ResetButton;
