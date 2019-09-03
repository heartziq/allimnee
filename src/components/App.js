import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./Main";
import AboutPage from "./About";
import Header from "./Header";

// Load Pages
import BrowseTutor from "../pages/BrowseTutor";

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
        <Route
          path="/browse"
          render={props => <BrowseTutor {...props} />}
        />
        <Route path="/about" component={AboutPage} />
      </Switch>
    </div>
  );
}

export default App;
