import { createStore, combineReducers } from "redux";
import uuid from "uuid/v1";

/* DEFINE DEFAULT STATE */

// tutor list...
const tutorDefaultState = [];

// filter tutor...
const filter = {
  tutorName: "",
  star: 3
};

// class list...
const classDefaultState = [
  {
    _id: 0,
    subject: "Mathematics",
    level: [1, 2, 3],
    tutorName: "Lily Aldrin",
    location: "494 Tampines Ave 3",
    datetime: "Sat, 11:00am - 1:00pm",
    time: "11:00am"
  },
  {
    _id: 1,
    subject: "Science",
    level: [4, 5, 6],
    tutorName: "Lily Aldrin",
    location: "494 Tampines Ave 3",
    datetime: "Sun, 11:00am - 1:00pm",
    time: "11:00am"
  },
  {
    _id: 2,
    subject: "English",
    level: [1, 2, 3],
    tutorName: "Lily Aldrin",
    location: "494 Tampines Ave 3",
    datetime: "Mon, 11:00am - 1:00pm",
    time: "11:00am"
  }
];

// filter classes...
const filterClass = {
  isBefore: false,
  time: "07:30",
  subject: [],
  day: "",
  level: 0,
};

// class reducer
const classReducer = (state = classDefaultState, action) => {
  switch (action.type) {
    case "updateClassList":
      return action.initialData;

    default:
      return state;
  }
};

const filterClassReducer = (state = filterClass, action) => {
  switch (action.type) {
    case "updateTime":
      return { ...state, time: action.time };
    case "updateBeforeOrAfter":
      return { ...state, isBefore: !state.isBefore };
    case "updateFilterSubject":
      return { ...state, subject: action.subject };
    case "updateFilterDay":
      return { ...state, day: action.day };
    case 'updateFilterLevel':
      return { ...state, level: action.level };
    default:
      return state;
  }
};

// reducer for tutor
const tutorReducer = (state = tutorDefaultState, action) => {
  switch (action.type) {
    case "change":
      const dummySample = {
        _id: uuid(),
        name: action.name,
        stars: 4,
        bio:
          "Goal-oriented 'math-head' with passion in crunching numbers - only numbers",
        subject: ["E Maths", "A Maths", "C Maths"],
        level: ["Secondary 2", "Secondary 3", "Secondary 4"],
        contact: {
          email: "vvalentine@telegram.com",
          phone: "94131322"
        }
      };
      return [...state, dummySample];
    case "fill":
      return action.initialData;

    default:
      return state;
  }
};

const filterReducer = (state = filter, action) => {
  switch (action.type) {
    case "update":
      return { ...state, tutorName: action.tutorName };
    case "changeStar":
      return { ...state, star: action.star };
    default:
      return state;
  }
};
export default function(initialState) {
  const store = createStore(
    combineReducers({
      tutor: tutorReducer,
      filter: filterReducer,
      classes: classReducer,
      filterClass: filterClassReducer
    }),
    initialState
  );

  return store;
}
