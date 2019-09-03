import React from "react";
import qs from 'query-string';

export default props => {
  console.log(`id:${qs.parse(props.location.search).id}`)
  return (
    <div className="BrowseTutor">
      <h1>Browse Tutor ddd</h1>
    </div>
  );
};
