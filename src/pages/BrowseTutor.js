import React from "react";
import qs from "query-string";
import { connect } from "react-redux";
import fetch from "isomorphic-fetch";
import { sort } from "../redux/selectors";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

class BrowseTutor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: ""
    };

    this.classes = this.useStyles();
  }

  useStyles = () =>
    makeStyles(theme => ({
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

  fetchInitialTutorState = async () => {
    const result = await fetch("/api/tutor");
    const tutorList = await result.json();

    this.props.dispatch({ type: "fill", initialData: tutorList });
  };

  componentDidMount() {
    if (this.props.tutor.length < 1) this.fetchInitialTutorState();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch({ type: "change", name: this.state.textInput });
  };

  handleKeyChange = value => this.setState(() => ({ textInput: value }));

  renderTutors = () => {
    return this.props.tutor.map(e => (
      <li key={e._id}>
        {e.name}, {e.stars}/5
      </li>
    ));
  };

  render() {
    const userQuery = qs.parse(this.props.location.search);
    return (
      <div className="BrowseTutor">
        <h1 style={{ color: "red" }}>Browse Tutor</h1>
        <form className={this.classes.container} noValidate autoComplete="off">
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
            onChange={e =>
              this.props.dispatch({ type: "update", name: e.target.value })
            }
          />
          <TextField
            id="outlined-number"
            label="Number"
            value={this.props.filter.star}
            onChange={e =>
              this.props.dispatch({
                type: "changeStar",
                star: parseInt(e.target.value, 10)
              })
            }
            type="number"
            className={this.classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="outlined"
          />
        </form>
        <ul className="tutor-list">{this.renderTutors()}</ul>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.textInput}
            onChange={e => this.handleKeyChange(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

const mapToProps = state => ({
  tutor: sort(state.tutor, state.filter),
  filter: state.filter
});

export default connect(mapToProps)(BrowseTutor);
