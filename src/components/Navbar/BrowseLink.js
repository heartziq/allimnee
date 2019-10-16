import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  navLink: {
    textDecoration: "none"
  }
}));

export default function BrowseLink() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <NavLink
          color="inherit"
          to="/browse"
          className={classes.navLink}
          activeClassName="is-active"
          exact={true}
        >
          Tutor
        </NavLink>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <NavLink
          color="inherit"
          to="/browse"
          className={classes.navLink}
          activeClassName="is-active"
          exact={true}
        >
          Jobs
        </NavLink>
      </MenuItem>{" "}
    </Menu>
  );

  return (
    <Fragment>
      <div className={classes.sectionDesktop}>
        <Button
          color="inherit"
          aria-controls={menuId}
          onClick={handleProfileMenuOpen}
        >
          Browse
        </Button>
      </div>

      {renderMenu}
    </Fragment>
  );
}
