import React from "react";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";

import Main from "./components/main";
import Login from "./components/login";
// import UsersList from "./components/usersList";
// import User from "./components/user";
import Users from "./components/users";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId?" component={Users} />
        {/* <Route path="/users/:userId" render={(props) => <User {...props} />} />
        <Route path="/users" component={UsersList} /> */}
      </Switch>
    </>
  );
}

export default App;
