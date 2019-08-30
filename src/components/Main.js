import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import MyButton from './MyButton';
import { connect } from 'react-redux';

class MainApp extends Component {
  
  render() {
    console.log('rendering MainApp...')
    // Remember return statement
    return (
      <div className="MainApp">
        <h1>{this.props.initialData}</h1>
        <p>count: {this.props.count}</p>
        <MyButton increaseCounter={() => this.props.dispatch({type: 'add'})}/>
      </div>
    );
  }
}

MainApp.propTypes = {
  initialData: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

export default connect(mapStateToProps)(MainApp);
