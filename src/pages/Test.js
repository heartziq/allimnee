import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Subject() {
  const classes = useStyles();
  const [state, setState] = React.useState('');

  const handleChange = event => {
    setState(event.target.value);
  };

  return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="name-native-error">Subject</InputLabel>
        <NativeSelect
          value={state}
          onChange={handleChange}
          name="name"
          inputProps={{
            id: 'name-native-error',
          }}
        >
          <option value="" />
          <optgroup label="Maths">
            <option value={1}>A Maths</option>
            <option value={2}>E Maths</option>
            <option value={3}>C Maths</option>
          </optgroup>
          <optgroup label="Science">
            <option value={4}>Physics</option>
            <option value={5}>Chemistry</option>
            <option value={6}>Biology</option>
          </optgroup>
        </NativeSelect>
      </FormControl>
  );
}