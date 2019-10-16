import React from "react";
import qs from "query-string";
import { connect } from "react-redux";
import fetch from "isomorphic-fetch";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import { sort } from "../redux/selectors";
import Filter from "../components/Filter";
import DrawerFilter from "../components/Filter/DrawerFilter";
import TutorCard from "../components/TutorCard";

class BrowseTutor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: "",
      right: false,
      value: "female"
    };

    // define custom styles
    this.classes = makeStyles({
      // styles here
    });
  }

  fetchInitialTutorState = async () => {
    const result = await fetch("/api/tutor");
    const tutorList = await result.json();

    // populate redux state.tutor
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
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        {this.props.tutor.map(e => (
          <TutorCard key={e._id} tutor={e} />
        ))}
      </Grid>
    );
  };

  render() {
    // grab user query param
    // const userQuery = qs.parse(this.props.location.search);

    return (
      <div className="BrowseTutor">
        <DrawerFilter>
          <Filter />
        </DrawerFilter>
        <h1>Browse Tutor</h1>
        {/* <TutorCard tutor={this.props.tutor[0]} /> */}
        {this.renderTutors()}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.textInput}
            onChange={({ target: { value } }) => this.handleKeyChange(value)}
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
