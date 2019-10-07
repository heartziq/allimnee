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
import fetch from 'isomorphic-fetch';

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

const getAllSubjects = async () => {
  const result = await fetch('/api/subject');

  return result;
}

const Filter = props => {
  const classes = useStyles();

  const [gender, setGender] = React.useState("female");
  
  // data
  // const subject = {
  //   maths: [
  //     { value: 1, title: "A Maths" },
  //     { value: 2, title: "E Maths" },
  //     { value: 3, title: "C Maths" }
  //   ],
  //   science: [
  //     { value: 4, title: "Physics" },
  //     { value: 5, title: "Chemistry" },
  //     { value: 6, title: "Biology" }
  //   ]
  // };

  // make use of Hook + state to populate this data
  const subject = getAllSubjects().then()
  

  const areaLocation = {
    north: [
      { value: 1, title: "Yishun" },
      { value: 2, title: "Sengkang" },
      { value: 3, title: "Compassvale" }
    ],
    central: [
      { value: 4, title: "Queensway" },
      { value: 5, title: "Orchard" },
      { value: 7, title: "Marina Boulevard" },
      { value: 6, title: "Raffles City" }
    ],
    west: [
      { value: 8, title: "Jurong" },
      { value: 9, title: "Choa Chu Kang" },
      { value: 10, title: "Bukit Gombak" }
    ]
  };

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
      <DropDownSelect
        title={"Subject"}
        data={subject}
      />
      <div className={classes.divider} />
      <DropDownSelect
        title={"Area"}
        data={areaLocation}
      />
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
