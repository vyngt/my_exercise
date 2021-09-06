import React from "react";
import { BrowserRouter } from "react-router-dom";
import LoginRoutes from "./Routes";

const Login = () => {
  React.useEffect(() => {
    document.title = "Login";
  }, []);
  return (
    <div>
      <h4>Login type</h4>
      <BrowserRouter>
        <LoginRoutes />
      </BrowserRouter>
    </div>
  );
};

export default Login;
