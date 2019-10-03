import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import clsx from "clsx";

const styles = {
  paper: {
    width: "30vw"
  },
};

function DrawerFilter(props) {
  const { classes, children, className, ...other } = props;

  const [state, setState] = React.useState({ textInput: "", right: false });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  return (
    <Fragment>
      <Button onClick={toggleDrawer("right", true)}>Filter</Button>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
        className={clsx(classes.paper, className)}
        {...other}
      >
        {children}
      </Drawer>
    </Fragment>
  );
}

DrawerFilter.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default withStyles(styles)(DrawerFilter);
