import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TodayIcon from "@material-ui/icons/Today";
import RoomIcon from "@material-ui/icons/Room";
import { NavLink } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import Hidden from "@material-ui/core/Hidden";
import qs from "query-string";

import Filter from "../components/Filter";
import Level from "../components/Filter/Level";
import { sortClass } from "../redux/selectors";
import { getAllClasses as FGetClasses } from "../api";

// helper
import { getRandomImage, isBrowser } from "../helper";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  navLink: {
    textDecoration: "none",
    color: "black"
  },
  inline: {
    display: "inline"
  },
  paperStyles: {
    height: "88vh"
  },
  divider: {
    height: theme.spacing(2)
  },
  subjectStyle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 10
    }
  },
  locationIcon: { fontSize: 15, marginRight: 3 },
  [theme.breakpoints.down("sm")]: {
    locationIcon: { color: "red" }
  }
}));

function MainApp(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("sm"));

  const [ssr, setSsr] = React.useState("css");

  React.useEffect(() => {
    setSsr("js");
  }, [ssr]);
  console.log("ssr: ", ssr);
  const [img, setImg] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const handleChangePage = (event, newPage) => {
    console.log(`you are now at page: ${newPage}`);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function popImg() {
    const imgSrc = await getRandomImage();
    setImg(imgSrc);
  }

  async function fetchClass() {
    console.info("running [FE] fetch(Main)....");
    // id will be synchronize with uri
    // get id from uri
    const classList = await FGetClasses();
    props.dispatch({ type: "updateClassList", initialData: classList });
  }

  React.useEffect(() => {
    popImg();
    if (!props.hasFetch) fetchClass();
  }, []);

  const lookupTable = {
    "Lower Primary": [1, 2, 3],
    "Upper Primary": [4, 5, 6],
    "Lower Secondary": [7, 8],
    "Upper Secondary": [9, 10, 11],
    NITEC: [12],
    JC1: [13],
    JC2: [14],
    Poly: [15]
  };

  function isSubsetOf(target, ref) {
    return target.every(item => ref.includes(item));
  }

  function getLevelText(levelList) {
    for (let [key, value] of Object.entries(lookupTable)) {
      if (isSubsetOf(levelList, value)) return key;
    }
  }

  // grab user query param (use this for URI persistent refresh)
  const userQuery = qs.parse(props.location.search);
  // console.log(`[FE]userQuery: ${JSON.stringify(userQuery)}`);

  function renderLocation(location) {
    if (isMobileOrTablet) {
      console.log("sm and below");
      return (
        <Typography
          variant="caption"
          align="right"
          style={{ color: "rgba(0, 0, 0, 0.54)" }}
        >
          <RoomIcon className={classes.locationIcon} />
          {location}
        </Typography>
      );
    } else {
      console.log("md and up");
      return (
        <Typography variant="body2" align="right" style={{ color: "green" }}>
          <RoomIcon className={classes.locationIcon} />
          {location}
        </Typography>
      );
    }
  }

  function renderClasses() {
    const classList = props.classes;

    return classList
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(thisClass => (
        <React.Fragment key={thisClass._id}>
          <ListItem>
            <Grid container>
              <Grid item container direction="row" xs={9} md={4}>
                <Hidden smDown>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={img} />
                  </ListItemAvatar>
                </Hidden>

                <ListItemText
                  primary={
                    <NavLink to="/browse" className={classes.navLink}>
                      <Typography
                        variant="body1"
                        className={classes.subjectStyle}
                      >
                        {getLevelText(thisClass.level)}, {thisClass.subject}
                      </Typography>
                    </NavLink>
                  }
                  secondary={
                    <React.Fragment>
                      <TodayIcon style={{ fontSize: 15, marginRight: 3 }} />
                      <span style={{ verticalAlign: "text-bottom" }}>
                        {thisClass.datetime}
                      </span>
                    </React.Fragment>
                  }
                />
              </Grid>
              <Grid item xs={3} md={4}>
                <ListItemText secondary={renderLocation(thisClass.location)} />
              </Grid>
              <Hidden smDown>
                <Grid item md={4}>
                  <ListItemText
                    secondary={
                      <Typography variant="subtitle1" align="right">
                        {thisClass.tutorName}
                      </Typography>
                    }
                  />
                </Grid>
              </Hidden>
            </Grid>
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ));
  }

  return (
    <Grid container>
      <Hidden implementation={ssr} smDown>
        <Grid item md={2}>
          <Filter isBrowseClass />
        </Grid>
      </Hidden>

      <Grid item md={10} xs={12}>
        <Container fixed>
          <Level />
          <List className={classes.root}>{renderClasses()}</List>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10]}
            component="div"
            count={props.classes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Container>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  classes: sortClass(state.classes, state.filterClass),
  hasFetch: state.hasFetch
});

export default connect(mapStateToProps)(MainApp);
