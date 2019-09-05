import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./Main";
import Header from "./Header";

// Load Pages
import BrowseTutor from "../pages/BrowseTutor";
import Test from '../pages/Test';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route
          path="/"
          render={props => <Main {...props} initialData={"Client"} />}
          exact={true}
        />
        <Route path="/browse" render={props => <BrowseTutor {...props} />} />
        <Route
          path="/test"
          render={props => <Test {...props} />}
        />
      </Switch>
    </div>
  );
}

export default App;
