import React from "react";
import { Link } from "react-router-dom";
import { ResetButton } from "../../features/reset_button";

const NavBar: React.FC<{}> = () => {
  return (
    <div>
      <h3>Navigator</h3>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <ResetButton />
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
