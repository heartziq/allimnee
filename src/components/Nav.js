import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { NavLink } from "react-router-dom";

// to be checked later..
import { makeStyles } from "@material-ui/core/styles";

import BrowseLink from "./BrowseLink";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  navLink: {
    textDecoration: "none",
    color: "#fff"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/" color="inherit" className={classes.navLink}>
              Home
            </NavLink>
          </Typography>
          <Button color="inherit">Login</Button>
          <NavLink to="/test" color="inherit" className={classes.navLink}>
            Test
          </NavLink>
          <BrowseLink />
        </Toolbar>
      </AppBar>
    </div>
  );
}
