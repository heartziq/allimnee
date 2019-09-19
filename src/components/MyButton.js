import React from "react";
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

export default function MyButton({increaseCounter}) {
  // always be on top
  const classes = useStyles();

  return (
    <div>
      <Button onClick={() => increaseCounter()} variant="contained" color="primary" className={classes.button}>
        add
      </Button>
    </div>
  );
}
