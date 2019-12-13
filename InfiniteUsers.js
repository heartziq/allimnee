import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import debounce from "lodash.debounce";
import fetch from "isomorphic-fetch";

const useStyles = makeStyles(theme => ({
  root: {
    // some styles here...
  }
}));

function InifiniteUsers(props) {
  const classes = useStyles();

	// state to keep track of scrolling & listofusers
  const [overallState, setOverallState] = React.useState({
    error: false,
    hasMore: true,
    isLoading: false,
    users: []
  });

	// fetch 3 class per scroll
  const fetchRandomUsers = async numberOfUsers => {
    const response = await fetch(
      `https://randomuser.me/api/?results=${numberOfUsers}`
    );

    try {
      // new list of users
      const nextUsers = response.body.results.map(user => ({
        email: user.email,
        name: Object.values(user.name).join(" "),
        photo: user.picture.medium,
        username: user.login.username,
        uuid: user.login.uuid
      }));

      // Merge into list of existing users
      setOverallState({
        ...overallState,
        hasMore: overallState.users.length < 100,
        isLoading: false,
        users: [...users, ...nextUsers]
      });
    } catch (err) {
      setOverallState({
        ...overallState,
        error: err.message,
        isLoading: false
      });
    }
  };

  try {
    if (__isBrowser__) {
      console.log(`isBrowser: ${__isBrowser__}`);
      // bind .onscroll
      window.onscroll = debounce(() => {
        const { error, isLoading, hasMore } = overallState;

        // has scrolled all the way to the end?
        const hasScrolledToTheEnd =
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight;

        if (error || isLoading || !hasMore) return;

        console.log(`hasScroll: ${hasScrolledToTheEnd}`)
        if (hasScrolledToTheEnd) {
          
          React.useEffect(() => {
            fetchRandomUsers(10);
          }, [setOverallState]);
        }
      }, 100);
    }
  } catch (error) {
    console.log('am I here?')
    console.error(error.message);
  }

  const { error, hasMore, isLoading, users } = overallState;
  console.log('users', users);
  return (
    <div>
      <h1>Inifinite Users!</h1>
    </div>
  );
}

export default InifiniteUsers;
