import React, { Component } from "react";
import fetch from "isomorphic-fetch";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ""
    };
  }
  componentDidMount() {
    fetch("/test")
      .then(res => res.json())
      .then(({ data }) => {
        this.setState(() => ({ data }));
        return null;
      })
      .catch(err => console.error(err.stack));
  }

  render() {
    return (
      <div>
        <h1>{this.state.data}</h1>
      </div>
    );
  }
}
