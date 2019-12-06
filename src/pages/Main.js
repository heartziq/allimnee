import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
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

import Filter from "../components/Filter";
import Level from "../components/Filter/Level";
import { sortClass } from "../redux/selectors";
import { getAllClasses } from "../api";

// helper
import { getRandomImage } from "../helper";

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
  }
}));

function MainApp(props) {
  const classes = useStyles();

  const [img, setImg] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
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
    const classList = await getAllClasses();
    props.dispatch({ type: "updateClassList", initialData: classList });
  }

  React.useEffect(() => {
    popImg();
    fetchClass();
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

  function renderClasses() {
    const classList = props.classes;

    return classList
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(thisClass => (
        <React.Fragment key={thisClass._id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={img} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <NavLink to="/browse" className={classes.navLink}>
                  <Typography variant="h6">
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
            <ListItemText
              secondary={
                <React.Fragment>
                  <RoomIcon style={{ fontSize: 15, marginRight: 3 }} />
                  {thisClass.location}
                </React.Fragment>
              }
            />
            <ListItemText
              secondary={
                <Typography variant="subtitle1" align="center">
                  {thisClass.tutorName}
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ));
  }

  return (
    <Grid container>
      <Grid item md={2}>
        <Paper className={classes.paperStyles}>
          <Filter />
        </Paper>
      </Grid>
      <Grid item md={10}>
        <Container fixed>
          <Level />
          <List className={classes.root}>{renderClasses()}</List>
          <TablePagination
            rowsPerPageOptions={[1, 5, 10]}
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
  classes: sortClass(state.classes, state.filterClass)
});

export default connect(mapStateToProps)(MainApp);
