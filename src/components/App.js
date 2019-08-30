import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./Main";
import AboutPage from './About';

function App() {
  return (
    <Switch>
      <Route
        path="/"
        component={() => <Main initialData={"Main I"} />}
        exact={true}
      />
      <Route path="/about" component={AboutPage} />
    </Switch>
  );
}

export default App;
