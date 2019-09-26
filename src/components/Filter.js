import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

const Filter = props => {
  const classes = useStyles();
  function valuetext(value) {
    return `${value}°C`;
  }
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="standard-full-width"
        label="Label"
        style={{ margin: 8 }}
        placeholder="Search tutor"
        helperText="Full width!"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
        onChange={e => props.dispatch({ type: "update", name: e.target.value })}
      />
      <Typography id="discrete-slider" gutterBottom>
        Temperature
      </Typography>
      <Slider
        defaultValue={props.filter.star}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={5}
        onChange={(e, value) =>
          props.dispatch({
            type: "changeStar",
            star: parseInt(value, 10)
          })
        }
      />
    </form>
  );
};

const mapStateToProps = state => ({
  filter: state.filter
});

export default connect(mapStateToProps)(Filter);
