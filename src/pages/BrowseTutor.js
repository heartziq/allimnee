import React from "react";
import qs from "query-string";
import { connect } from "react-redux";
import fetch from "isomorphic-fetch";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { sort } from "../redux/selectors";
import Filter from "../components/Filter";
import DrawerFilter from "../components/Filter/DrawerFilter";
import TutorCard from "../components/TutorCard";

const styles = theme => ({
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  paper: {
    padding: theme.spacing(1, 2)
  }
});

class BrowseTutor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: "",
      right: false,
      value: "female"
    };
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
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
      >
        {this.props.tutor.map(e => (
          <TutorCard key={e._id} tutor={e} />
        ))}
      </Grid>
    );
  };

  handleClick = event => {
    event.preventDefault();
    alert("You clicked a breadcrumb.");
  };

  render() {
    // grab user query param
    const userQuery = qs.parse(this.props.location.search);
    // console.log(`userQuery: ${JSON.stringify(userQuery)}`);

    // grab props injected by HOC (withStyles)
    const { classes } = this.props;
    return (
      <div className="BrowseTutor">
        <div className={classes.topBar}>
          <Typography variant="h5">Browse Tutors</Typography>

          <DrawerFilter>
            <Filter isBrowseTutor />
          </DrawerFilter>
        </div>
        <hr />
        {this.renderTutors()}
      </div>
    );
  }
}

const mapToProps = state => ({
  tutor: sort(state.tutor, state.filter),
  filter: state.filter
});

export default connect(mapToProps)(withStyles(styles)(BrowseTutor));
