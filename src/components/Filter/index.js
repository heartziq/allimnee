import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Slider from "@material-ui/core/Slider";
import Radio from "@material-ui/core/Radio";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import fetch from "isomorphic-fetch";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import DropDownSelect from "./DropDownSelect";

const useStyles = makeStyles(theme => ({
  divider: {
    height: theme.spacing(2)
  },
  formContainer: { margin: 8 },
  formControl: {
    margin: theme.spacing(3)
  }
}));

const Filter = props => {
  const classes = useStyles();

  // const [state, setState] = React.useState("");
  // const handleChange = event => setState(event.target.value);

  const [when, setWhen] = React.useState("");
  const handleWhen = event => setWhen(event.target.value);

  const [gender, setGender] = React.useState("female");
  const [filter, setFilter] = React.useState({
    area: {},
    subject: {}
  });

  const handleTimeCheck = e => {
    props.dispatch({
      type: "updateBeforeOrAfter"
    });
  };
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

  // componentDidMount
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

  const handleTimeChange = e => {
    props.dispatch({ type: "updateTime", time: e.target.value });
  };

  function renderBrowseTutorFilter() {
    return (
      <React.Fragment>
        <TextField
          id="standard-full-width"
          label="Name"
          placeholder="Search tutor..."
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          value={props.filter.tutorName}
          onChange={e => {
            props.dispatch({ type: "update", tutorName: e.target.value });
          }}
        />
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
          <div className={classes.divider} />
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
        <DropDownSelect title={"Area"} data={filter.area} />
      </React.Fragment>
    );
  }

  function renderBrowseClassFilter() {
    return (
      <React.Fragment>
        <Box width={1}>
          <InputLabel shrink htmlFor="name-native-error">
            Day:
          </InputLabel>
          <NativeSelect
            value={props.filterClass.day}
            onChange={event =>
              props.dispatch({
                type: "updateFilterDay",
                day: event.target.value
              })
            }
            name={"Day"}
            inputProps={{
              id: "name-native-error"
            }}
          >
            <option value="" />
            <option key={1} value={"Mon"}>
              {"Mon"}
            </option>
            <option key={2} value={"Tue"}>
              {"Tue"}
            </option>
            <option key={3} value={"Wed"}>
              {"Wed"}
            </option>
            <option key={4} value={"Thu"}>
              {"Thu"}
            </option>
            <option key={5} value={"Fri"}>
              {"Fri"}
            </option>
            <option key={6} value={"Sat"}>
              {"Sat"}
            </option>
            <option key={7} value={"Sun"}>
              {"Sun"}
            </option>
          </NativeSelect>
        </Box>
        <div className={classes.divider} />
        <Grid container>
          <Grid item>
            {" "}
            <RadioGroup
              aria-label="when"
              name="when1"
              value={when}
              onChange={handleWhen}
            >
              <FormLabel component="label" style={{ fontSize: 13 }}>
                When
              </FormLabel>
              <FormControlLabel
                checked={props.filterClass.isBefore}
                value="before"
                onChange={e => handleTimeCheck(e)}
                control={
                  <Radio
                    icon={<RadioButtonUncheckedIcon fontSize="small" />}
                    checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
                  />
                }
                label="before"
              />
              <FormControlLabel
                checked={!props.filterClass.isBefore}
                value="after"
                onChange={e => handleTimeCheck(e)}
                control={
                  <Radio
                    icon={<RadioButtonUncheckedIcon fontSize="small" />}
                    checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
                  />
                }
                label="after"
              />
            </RadioGroup>
          </Grid>
          <Grid item>
            <TextField
              id="time"
              label="Time"
              type="time"
              defaultValue={props.filterClass.time}
              onChange={handleTimeChange}
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 300 // 5 min
              }}
            />
          </Grid>
        </Grid>
        <div className={classes.divider} />
      </React.Fragment>
    );
  }

  return (
    <form className={classes.formContainer} noValidate autoComplete="off">
      {props.isBrowseTutor && renderBrowseTutorFilter()}
      <div className={classes.divider} />
      <Box width={1}>
        <InputLabel shrink htmlFor="name-native-error">
          Level:
        </InputLabel>
        <NativeSelect
          value={props.filterClass.level}
          onChange={event =>
            props.dispatch({
              type: "updateFilterLevel",
              level: parseInt(event.target.value, 10)
            })
          }
          name={"Level"}
          inputProps={{
            id: "name-native-error"
          }}
        >
          <option value="" />
          <option key={1} value={1}>
            {"Primary 1"}
          </option>
          <option key={2} value={2}>
            {"Primary 2"}
          </option>
          <option key={3} value={3}>
            {"Primary 3"}
          </option>
          <option key={4} value={4}>
            {"Primary 4"}
          </option>
          <option key={5} value={5}>
            {"Primary 5"}
          </option>
          <option key={6} value={6}>
            {"Primary 6"}
          </option>
          <option key={7} value={7}>
            {"Secondary 1"}
          </option>
          <option key={8} value={8}>
            {"Secondary 2"}
          </option>
          <option key={9} value={9}>
            {"Secondary 3"}
          </option>
          <option key={10} value={10}>
            {"Secondary 4"}
          </option>
          <option key={11} value={11}>
            {"Secondary 5"}
          </option>
          <option key={12} value={12}>
            {"NITEC"}
          </option>
          <option key={13} value={13}>
            {"JC1"}
          </option>
          <option key={14} value={14}>
            {"JC2"}
          </option>
          <option key={15} value={15}>
            {"Poly"}
          </option>
        </NativeSelect>
      </Box>
      <div className={classes.divider} />
      {props.isBrowseClass && renderBrowseClassFilter()}
    </form>
  );
};

const mapStateToProps = state => ({
  filter: state.filter,
  filterClass: state.filterClass
});

export default connect(mapStateToProps)(Filter);
