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

import Filter from "../components/Filter";
import Level from "../components/Filter/Level";

// helper
import { getRandomImage } from "../helper";
import { ExpansionPanelSummary } from "@material-ui/core";

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

  async function popImg() {
    const imgSrc = await getRandomImage();
    setImg(imgSrc);
  }

  React.useEffect(() => {
    popImg();
  }, []);

  function getLevelText(levelList) {
    const sum = levelList.reduce((acc, ele) => acc + ele);

    return sum < 7 ? "Lower Primary" : "Upper Primary";
  }

  function renderClasses() {
    const thisClass = {
      _id: 0,
      subject: "Mathematics",
      level: [1, 2, 3],
      tutorName: "Lily Aldrin",
      location: "494 Tampines Ave 3",
      datetime: "Sat, 11:00am - 1:00pm"
    };

    return (
      <React.Fragment>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={img} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <NavLink to="/browse" className={classes.navLink}>
                <Typography variant="h6">
                  {getLevelText(thisClass.level)},
                  {thisClass.subject}
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
    );
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
        </Container>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  count: state.count
});

export default connect(mapStateToProps)(MainApp);
