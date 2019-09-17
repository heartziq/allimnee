import { createStore, combineReducers } from "redux";
import uuid from 'uuid/v1';

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
      const dummySample =   {
        "_id": uuid(),
        "name": action.name,
        "stars": 4,
        "bio": "Goal-oriented 'math-head' with passion in crunching numbers - only numbers",
        "subject": ["E Maths", "A Maths", "C Maths"],
        "level": ["Secondary 2", "Secondary 3", "Secondary 4"],
        "contact": {
          "email": "vvalentine@telegram.com",
          "phone": "94131322"
        }
      }
      return [
        ...state,
        dummySample,
      ];
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
