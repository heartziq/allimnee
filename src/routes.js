import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";

// navbar...
import Nav from "./components/Navbar";

// Load Pages
import BrowseTutor from "./pages/BrowseTutor";
import Test from "./pages/Test";
import Main from "./pages/Main";

function App(props) {

  return (
    <Fragment>
      <Nav />
      <Switch>
        <Route
          path="/"
          render={props => <Main {...props} initialData={"Client"} />}
          exact={true}
        />
        <Route path="/browse" render={props => <BrowseTutor {...props} />} />
        {/* <Route path="/test" render={props => <Test {...props} />} /> */}
        <Route path="/test" render={props => <Redirect to={"/browse"} />} />
      </Switch>
    </Fragment>
  );
}

export default App;
