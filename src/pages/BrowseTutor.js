import React from "react";
import qs from "query-string";
import { connect } from "react-redux";

const BrowseTutor = props => {
  // get id from param id
  // console.log(`id:${qs.parse(props.location.search).id}`);
  const [textInput, setTextInput] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(e.target.value);
    props.dispatch({ type: "change", name: textInput });
  };

  console.log(`keyboard text: ${textInput}`);

  return (
    <div className="BrowseTutor">
      <h1>Browse Tutor {props.tutor}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={textInput}
          onChange={e => setTextInput(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

const mapToProps = state => ({
  tutor: state.tutor
});

export default connect(mapToProps)(BrowseTutor);
