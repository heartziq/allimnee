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

    const isServer = this.props.staticContext && this.props.staticContext.isServer;
    if (!isServer)
      this.abortController = new AbortController();

    this.state = {
      textInput: "",
      right: false,
      value: "female"
    };
  }

  fetchInitialTutorState = async () => {
    console.info("running [FE] fetch(BrowseTUtor)....");

    // const abortController = new AbortController();
    // const { signal } = abortController;

    try {
      const result = await fetch("/api/tutor");
      const tutorList = await result.json();

      // populate redux state.tutor
      this.props.dispatch({ type: "fill", initialData: tutorList });
    } catch (e) {

      if (e.name === 'AbortError')
        console.log(e.name)
    }

  };

  componentDidMount() {
    if (this.props.tutor.length < 1) this.fetchInitialTutorState();
  }

  componentWillUnmount() {
    // console.log('abort controller....')
    // this.abortController.abort();
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
    // grab user query param (use this for URI persistent refresh)
    const userQuery = qs.parse(this.props.location.search);
    // console.log(`[FE]userQuery: ${JSON.stringify(userQuery)}`);

    // grab props injected by HOC (withStyles)
    const { classes } = this.props;
    return (
      <div className="BrowseTutor">
        <div className={classes.topBar}>
          <Typography variant="h5">Browse Tutors</Typography>

          <DrawerFilter title={'Filter'}>
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
