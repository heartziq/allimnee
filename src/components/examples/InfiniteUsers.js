import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import debounce from "lodash.debounce";
import fetch from "isomorphic-fetch";
import PropTypes from "prop-types";
import InsertData from "./Injector";
// fetch api
import { getAllClasses } from "../../api";

const useStyles = makeStyles(theme => ({
  root: {
    // some styles here...
  },
  mainHeading: {
    color: 'red'
  }
}));

function InfiniteUsers({ overallState, updateWholeClassObj, mergeNewUsers, updateError }) {
  const classes = useStyles();

  // state to keep track of scrolling & listofusers

  const [isBrowser, setBrowser] = React.useState(false);

  const populateInitialUsers = async () => {
    const results = await getAllClasses({ limit: 4 });
    // const results = await response.json();

    updateWholeClassObj({ type: "updateWholeClassObj", initialData: [...results] })
    // setOverallState(prevState => ({ ...overallState, skip: prevState.skip + 4, users: [...results] }));
  };

  React.useEffect(() => {
    populateInitialUsers();
    setBrowser(true);
  }, []);

  // fetch 3 class per scroll
  const fetchRandomUsers = async numberOfUsers => {
    const response = await fetch(
      `http://localhost:3000/api/classes?limit=${numberOfUsers}&skip=${overallState.skip}`
    );

    const results = await response.json();

    try {
      // new list of users
      const nextUsers = results.map(user => ({
        _id: user._id,
        subject: user.subject,
        name: user.name,
        img: user.img
      }));

      // Merge into list of existing users
      // maxed 100 users at any given time
      mergeNewUsers({ type: "mergeNewUsers", initialData: [...users, ...nextUsers] });
    } catch (err) {
      updateError({ type: "updateError", initialData: err.message });
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
          // }, [overallState]);
          fetchRandomUsers(4);
        }
      }, 100);
    }
  } catch (error) {
    console.error(error.message);
  }

  const { error, hasMore, isLoading, users } = overallState;

  return (
    <div>
      <h1 className={classes.mainHeading}>Infinite Users!</h1>

      {users.map((user, index) => (
        <div key={index}>
          <span
            style={{
              marginRight: 5,
              fontStyle: "italic",
              fontSize: "1rem",
              float: "left",
              verticalAlign: "top"
            }}
          >

          </span>
          <h2>
            {user._id} = {user.subject}
          </h2>
          <p>{user.name}</p>
          <ul>
            <li>{user.img}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

InfiniteUsers.propTypes = {
  data: PropTypes.array
};

// export default InsertData(InfiniteUsers);
export default InfiniteUsers;