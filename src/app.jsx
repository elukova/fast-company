import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
  return (
    <>
      <div className="container">
        <AppLoader>
          <AuthProvider>
            <NavBar />
            <Switch>
              <Route path="/login/:type?" component={Login} />
              <Route path="/logout" component={LogOut}></Route>
              <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
              <Route path="/" exact component={Main} />
              <Redirect to="/" />
            </Switch>
          </AuthProvider>
        </AppLoader>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
