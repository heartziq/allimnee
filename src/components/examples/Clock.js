import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
    this.color = [
      "#ff5733",
      "#900C3F",
      "#33ceff",
      " #f333ff ",
      "#34b636",
      " #e24faf ",
      " #e24fa4 ",
      " #32a065 ",
      " #9bd32b ",
      " #d36d2b "
    ];
  }

  tick() {
    this.setState({ date: new Date() });
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentDidUpdate() {
    console.log(`color is updated!`)
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div>
        <h1>
          <span
            style={{
              color: this.color[
                this.state.date.toLocaleTimeString().match(/\d\s+[P|A]M/)[0].split(" ")[0]
              ]
            }}
          >
            Hello
          </span>
          , world!
        </h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default Clock;