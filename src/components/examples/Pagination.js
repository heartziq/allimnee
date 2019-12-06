import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TodayIcon from "@material-ui/icons/Today";
import RoomIcon from "@material-ui/icons/Room";


import { connect } from "react-redux";

import { sortClass } from "../../redux/selectors";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: "auto"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

function EnhancedTable(props) {
  const classes = useStyles();
  const rows = props.classes;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <ul>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(thisClass => (
                <React.Fragment key={thisClass._id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={'https://via.placeholder.com/40'} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <NavLink to="/browse">
                          <Typography variant="h6">
                            {'hello'}, {thisClass.subject}
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
              ))}
          </ul>
        </div>
        <TablePagination
          rowsPerPageOptions={[1, 5, 10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

const mapStateToProps = state => ({
  classes: sortClass(state.classes, state.filterClass)
});

export default connect(mapStateToProps)(EnhancedTable);
