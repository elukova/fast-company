import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";

function App() {
  return (
    <>
      <div className="container">
        <NavBar />
        <QualitiesProvider>
          <ProfessionProvider>
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/users/:userId?/:edit?" component={Users} />
              <Redirect to="/" />
            </Switch>
          </ProfessionProvider>
        </QualitiesProvider>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
