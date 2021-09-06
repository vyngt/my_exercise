import { Route, Switch, Redirect } from "react-router-dom";
import { Home } from "../components/home";
import { About } from "../components/about";
import { NavBar } from "../components/navbar";
import { UserProfile } from "../components/user_profile";
import { Register } from "../features/register";
import { Login } from "../features/auth";

const Routes = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/about" component={About} />
        <Route exact path="/user" component={UserProfile} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default Routes;
