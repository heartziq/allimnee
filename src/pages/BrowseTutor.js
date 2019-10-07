import React from "react";
import qs from "query-string";
import { connect } from "react-redux";
import fetch from "isomorphic-fetch";
import { makeStyles } from "@material-ui/core/styles";

import { sort } from "../redux/selectors";
import Filter from "../components/Filter";
import DrawerFilter from "../components/DrawerFilter";

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
      list: {
        width: 250
      },
      fullList: {
        width: "auto"
      }
    });
  }

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
    // grab user query param
    // const userQuery = qs.parse(this.props.location.search);

    return (
      <div className="BrowseTutor">
        <DrawerFilter>
          <Filter />
        </DrawerFilter>
        <h1 style={{ color: "red" }}>Browse Tutor</h1>
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
