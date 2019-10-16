import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: 1
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function DrawerFilter(props) {
  const classes = useStyles();
  const { children } = props;

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
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={toggleDrawer("right", true)}
      >
        <FilterListOutlinedIcon />
        Filter
      </Button>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {children}
      </Drawer>
    </Fragment>
  );
}

export default DrawerFilter;
