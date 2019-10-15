import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import fetch from "isomorphic-fetch";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  bigAvatar: {
    marginTop: 10,
    minHeight: 110,
    minWidth: 110
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  margin: {
    margin: theme.spacing(1),
  }
}));

export default function TutorCard(props) {
  const classes = useStyles();

  const [image, setImage] = useState("");

  useEffect(() => {
    getRandomImage();
  }, []);

  async function getRandomImage() {
    const response = await fetch("https://randomuser.me/api/?results=1");
    const result = await response.json();

    const {
      picture: { medium }
    } = result.results[0];

    setImage(medium);
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container justify="center" alignItems="center">
          <Avatar
            alt={props.tutor.name}
            src={image}
            className={classes.bigAvatar}
          />
        </Grid>
        <CardContent>
          <Typography align="center" variant="h6" gutterBottom>
            {props.tutor.name}
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
        </CardContent>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="contained" style={{backgroundColor: 'green'}} className={classes.margin}>
          Email
        </Button>
      </CardActions>
    </Card>
  );
}
