import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 1, 1, 0)
  },
  icon: theme.buttonIcon,
}));

function DrawerFilter(props) {
  const classes = useStyles();
  const { children } = props;

  const [state, setState] = React.useState({
    textInput: "",
    right: false,
    left: false
  });

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
      <Button
        className={classes.button}
        onClick={toggleDrawer(props.side, true)}
      >
        <FilterListOutlinedIcon className={classes.icon} />
        {props.title}
      </Button>
      <Drawer
        anchor={props.side}
        open={props.side === "right" ? state.right : state.left}
        onClose={toggleDrawer(props.side, false)}
      >
        {children}
      </Drawer>
    </Fragment>
  );
}

DrawerFilter.defaultProps = {
  side: "right"
};

export default DrawerFilter;
