import React from "react";
import qs from "query-string";
import { connect } from "react-redux";
import fetch from "isomorphic-fetch";

import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import { sort } from "../redux/selectors";
import Filter from "../components/Filter";

import { makeStyles } from "@material-ui/core/styles";

class BrowseTutor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: "",
      right: false
    };

    this.classes = makeStyles({
      list: {
        width: 250
      },
      fullList: {
        width: "auto"
      }
    });
  }

  useStyles = () =>
    makeStyles({
      list: {
        width: 250
      },
      fullList: {
        width: "auto"
      }
    });

  toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState(state => ({ ...state, [side]: open }));
  };

  sideList = side => (
    <div
      className={this.classes.list}
      role="presentation"
      onClick={this.toggleDrawer(side, false)}
      onKeyDown={this.toggleDrawer(side, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  greetings = () => (
    <h1>Peek-A-Boo</h1>
  )

  renderFilter = () => (
    <Filter />
  )

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
        <Button onClick={this.toggleDrawer("right", true)}>Filter</Button>
        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer("right", false)}
        >
          {this.renderFilter()}
        </Drawer>
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
