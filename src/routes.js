import React from "react";
import { Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

// navbar...
import Nav from "./components/Navbar";

// Load Pages
import BrowseTutor from "./pages/BrowseTutor";
import Test from "./pages/Test";
import Main from "./pages/Main";

function App() {
  return (
    <div>
      <Nav />
      <Container fixed>
        <Switch>
          <Route
            path="/"
            render={props => <Main {...props} initialData={"Client"} />}
            exact={true}
          />
          <Route path="/browse" render={props => <BrowseTutor {...props} />} />
          <Route path="/test" render={props => <Test {...props} />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
