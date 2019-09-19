import React from "react";
import qs from "query-string";
import { connect } from "react-redux";
import fetch from "isomorphic-fetch";
import { sort } from "../redux/selectors";

class BrowseTutor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: ""
    };
  }
  // get user param query (frontend only)
  // const userQuery = qs.parse(props.location.search);

  // const [textInput, setTextInput] = React.useState("");
    // updateInitialState = async () => {
    //   const { id } = qs.parse(this.props.location.search);

    //   const qParam = id ? `?id=${id}` : ``;
    //   const uri = `/api/tutor${qParam}`;

    //   const result = await fetch(uri);
    //   const data = await result.json();

    //   // update store
    //   this.props.dispatch({type: 'add', initialData: data});
    // }
    // componentDidMount() {
    //   this.updateInitialState();
    // }

  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch({ type: "change", name: this.state.textInput });
  };

  handleKeyChange = value => this.setState(() => ({textInput: value}))

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
        <h1 style={{ color: "red" }}>Browse Tutor f</h1>
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
  tutor: sort(state.tutor)
});

export default connect(mapToProps)(BrowseTutor);
