import { createStore, combineReducers } from "redux";

// count default layout
const countDefaultState = 0;

// tutor name default layout
const tutorDefaultState = [];

// reducer for add count
const countReducer = (state = countDefaultState, action) => {
  switch (action.type) {
    case "add":
      return state+1;
    default:
      return state;
  }
};

// reducer for tutor
const tutorReducer = (state = tutorDefaultState, action) => {
  switch (action.type) {
    case "change":
      return action.name;
    default:
      return state;
  }
};

export default function(initialState) {
  const store = createStore(combineReducers({
    count: countReducer,
    tutor: tutorReducer,
  }), initialState);

  return store;
}
