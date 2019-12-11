import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";

import { NavLink } from "react-router-dom";

// to be checked later..
import { makeStyles } from "@material-ui/core/styles";

import BrowseLink from "./BrowseLink";
import DrawerFilter from "../Filter/DrawerFilter";
import Filter from "../Filter";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  navLink: {
    textDecoration: "none",
    color: "#fff"
  },
  appBarColor: {
    backgroundColor: "black"
  }
}));

export default function Nav() {
  const classes = useStyles();

  return (
    <header>
      <AppBar className={classes.appBarColor} position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/" color="inherit" className={classes.navLink}>
              <Hidden only={["sm", "xs"]}>
                <NavLink to="/" color="inherit" className={classes.navLink}>
                  Brand
                </NavLink>
              </Hidden>
              <Hidden mdUp>
                <DrawerFilter side={"left"}>
                  <Filter isBrowseClass />
                </DrawerFilter>
              </Hidden>
            </NavLink>
          </Typography>
          <Button color="inherit">Login</Button>
          <BrowseLink />
        </Toolbar>
      </AppBar>
    </header>
  );
}
