import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  // define styles here
}));

export default function DropDownSelect({ title, data }) {
  // const classes = useStyles();
  const [state, setState] = React.useState("");

  const handleChange = event => setState(event.target.value);

  const renderGroup = sampleData =>
    Object.keys(sampleData).map(each => (
      <optgroup key={each} label={each}>
        {sampleData[each].map(e => (
          <option key={e.value} value={e.value}>
            {e.title}
          </option>
        ))}
      </optgroup>
    ));

  return (
    <Box width={1}>
      <InputLabel shrink htmlFor="name-native-error">{title}</InputLabel>
      <NativeSelect
        value={state}
        onChange={handleChange}
        name={title}
        inputProps={{
          id: "name-native-error"
        }}
      >
        <option value="" />
        {renderGroup(data)}
      </NativeSelect>
    </Box>
  );
}
