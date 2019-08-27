import React, { Component } from "react";
import { ThemeProvider } from "@material-ui/styles";
// import * as api from "../api";
import PropTypes from "prop-types";
import theme from "../../theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

function App(props) {
  const classes = useStyles();
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  const [greetings, setGreetings] = React.useState(props.initialData);
  // api
  //   .fetchTodos()
  //   .then(resp => this.setState({ todoList: resp }))
  //   .catch(err => console.error(err));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {/* <TodoList todoList={this.state.todoList} /> */}
        <h1>{greetings}</h1>
        <Button variant="contained" color="primary" className={classes.button}>
          Primary
        </Button>
      </div>
    </ThemeProvider>
  );
}

App.propTypes = {
  // initialData: PropTypes.object.isRequired
  initialData: PropTypes.string.isRequired
};

export default App;
