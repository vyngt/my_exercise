import { Route, Switch, Link } from "react-router-dom";
import LoginFaceID from "./Login_FaceID";
import LoginPassword from "./Login_Password";

const LoginRoutes = () => {
  return (
    <div>
      <LoginLinks />
      <Switch>
        <Route exact path="/login/password" component={LoginPassword} />
        <Route exact path="/login/face" component={LoginFaceID} />
      </Switch>
    </div>
  );
};

const LoginLinks = () => {
  return (
    <ul>
      <li>
        <Link to="/login/password">Login With Password</Link>
      </li>
      <li>
        <Link to="/login/face">Login With FaceID</Link>
      </li>
    </ul>
  );
};

export default LoginRoutes;
export { LoginLinks };
