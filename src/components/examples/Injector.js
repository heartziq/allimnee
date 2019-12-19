import React from "react";

function insertData(Component) {
  const props = {
    data: []
  };
  return <Component {...props} />;
}

export default insertData;
