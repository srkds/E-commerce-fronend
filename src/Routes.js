import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
      </Switch>
    </BrowserRouter>
  );
};

export default MyRoutes;

/* 
NOTE:
- not everything and every route we are creating is exposed to every single person who is signing into our application
- some routes are just restricted to administrative use
- some routes are restricted to only signedin users
- It is good idea to show some component to some people and some component to some other people
- so this is route level restriction or restricted routes
- using react-router-dom
*/
