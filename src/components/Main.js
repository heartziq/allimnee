import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import MyButton from "./MyButton";
import { connect } from "react-redux";

class MainApp extends Component {
  constructor(props){
    super(props);

    const isServer = props.staticContext ? props.staticContext.isServer : false

    this.state = {
      isServer
    }
    // if server, change greeting to indicate it's client
  }
  render() {
    // Remember return statement
    console.log(`isServer: ${this.state.isServer}`)
    return (
      <div className="MainApp">
        <h1>From Teehee</h1>
        <p>count: {this.props.count}</p>
        <MyButton
          increaseCounter={() => this.props.dispatch({ type: "add" })}
        />
      </div>
    );
  }
}

MainApp.propTypes = {
  initialData: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  count: state.count
});

export default connect(mapStateToProps)(MainApp);
