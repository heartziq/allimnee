import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./Main";
import AboutPage from "./About";
import Header from "./Header";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route
          path="/"
          component={() => <Main initialData={"Client"} />}
          exact={true}
        />
        <Route path="/about" component={AboutPage} />
      </Switch>
    </div>
  );
}

export default App;
