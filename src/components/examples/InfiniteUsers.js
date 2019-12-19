import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import debounce from "lodash.debounce";
import fetch from "isomorphic-fetch";
import { isBrowser } from "../../helper";

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

  const [isBrowser, setBrowser] = React.useState(false);

  const populateInitialUsers = async () => {
    const response = await fetch("https://randomuser.me/api/?results=10");
    const results = await response.json();

    setOverallState({ ...overallState, users: [...results.results] });
  };

  React.useEffect(() => {
    populateInitialUsers();
    setBrowser(true);
  }, []);

  // fetch 3 class per scroll
  const fetchRandomUsers = async numberOfUsers => {
    const response = await fetch(
      `https://randomuser.me/api/?results=${numberOfUsers}`
    );

    const results = await response.json();

    try {
      // new list of users
      const nextUsers = results.results.map(user => ({
        email: user.email,
        name: Object.values(user.name).join(" "),
        photo: user.picture.large,
        username: user.login.username,
        uuid: user.login.uuid
      }));

      // Merge into list of existing users
      // maxed 100 users at any given time
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
    if (isBrowser) {
      // bind .onscroll
      window.onscroll = debounce(() => {
        const { error, isLoading, hasMore } = overallState;

        // has scrolled all the way to the end?
        const hasScrolledToTheEnd =
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight;

        if (error || isLoading || !hasMore) return;

        if (hasScrolledToTheEnd) {
          console.log("User has scrolled till the end!");
          // React.useEffect(() => {
          //   fetchRandomUsers(10);
          // }, [setOverallState]);
          fetchRandomUsers(10);
        }
      }, 100);
    }
  } catch (error) {
    console.error(error.message);
  }

  const { error, hasMore, isLoading, users } = overallState;

  return (
    <div>
      <h1>Inifinite Users!</h1>

      {users.map((user, index) => (
        <div key={index}>
          <span
            style={{
              marginRight: 5,
              fontStyle: "italic",
              fontSize: "2rem",
              float: "left",
              verticalAlign: "top"
            }}
          >
            {user.uuid}
          </span>
          <h2>
            {user.name.first}, {user.name.last}
          </h2>
          <p>email: {user.email}</p>
          <ul>
            <li>username: {user.username}</li>
          </ul>
          <img src={user.photo} alt="profile-pic" />
        </div>
      ))}
    </div>
  );
}

export default InifiniteUsers;
