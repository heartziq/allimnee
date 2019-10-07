import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Slider from "@material-ui/core/Slider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import fetch from "isomorphic-fetch";

import Level from "./Level";
import DropDownSelect from "./DropDownSelect";

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
  },
  divider: {
    height: theme.spacing(2)
  }
}));

const Filter = props => {
  const classes = useStyles();

  const [gender, setGender] = React.useState("female");
  const [filter, setFilter] = React.useState({
    area: [],
    subject: []
  });

  // state.filter = {area: {}, subject: {}}
  const getSubsAndArea = async () => {
    // get subject
    const subjectResponse = await fetch("/api/subject");
    const subject = await subjectResponse.json();

    // get area
    const areaResponse = await fetch("/api/area");
    const area = await areaResponse.json();

    setFilter({
      area,
      subject
    });
  };

  React.useEffect(() => {
    getSubsAndArea();
  }, []);

  const handleRadioChange = event => {
    const value = event.target.value;
    setGender(value);
  };

  function valuetext(value) {
    return `${value}°C`;
  }
  return (
    <form noValidate autoComplete="off" style={{ margin: 8, width: "40vw" }}>
      <TextField
        id="standard-full-width"
        label="Name"
        placeholder="Search tutor..."
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
        onChange={e => props.dispatch({ type: "update", name: e.target.value })}
      />
      <div className={classes.divider} />
      <DropDownSelect title={"Subject"} data={filter.subject} />
      <div className={classes.divider} />
      <DropDownSelect title={"Area"} data={filter.area} />
      <Level />
      <div className={classes.divider} />
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender:</FormLabel>
        <RadioGroup
          aria-label="position"
          name="position"
          value={gender}
          onChange={handleRadioChange}
          row
        >
          <FormControlLabel
            value="male"
            control={<Radio color="primary" />}
            label="Male"
            labelPlacement="end"
          />
          <FormControlLabel
            value="female"
            control={<Radio color="primary" />}
            label="Female"
            labelPlacement="end"
          />
        </RadioGroup>
        <FormLabel component="legend">Ratings:</FormLabel>
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
      </FormControl>
    </form>
  );
};

const mapStateToProps = state => ({
  filter: state.filter
});

export default connect(mapStateToProps)(Filter);
