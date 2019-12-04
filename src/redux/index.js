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
    level: [1, 2],
    tutorName: "Lily Aldrin",
    location: "494 Tampines Ave 3",
    datetime: "Sat, 4:30pm - 7:00pm",
  },
  {
    _id: 1,
    subject: "Science",
    level: [4, 5, 6],
    tutorName: "Robin Schebatsky",
    location: "11 Madlin St, Albino",
    datetime: "Sun, 11:00am - 1:00pm",
  },
  {
    _id: 2,
    subject: "English",
    level: [11],
    tutorName: "Thomas McCoy",
    location: "112 Baskerville St",
    datetime: "Mon, 10:00am - 12:00pm",
  },
  {
    _id: 3,
    subject: "Chemistry (Pure)",
    level: [9, 10, 11],
    tutorName: "Walter White",
    location: "72nd Washington St, Alfredo's Mansion",
    datetime: "Wed, 10:00am - 12:00pm",
  },
  {
    _id: 4,
    subject: "Physics (Pure)",
    level: [9, 10, 11],
    tutorName: "Walter White",
    location: "72nd Washington St, Alfredo's Mansion",
    datetime: "Wed, 12:00pm - 2:00pm",
  },
  {
    _id: 5,
    subject: "Social Studies",
    level: [7, 8],
    tutorName: "Portia Eustace",
    location: "9th Detroit Rockstar Ave",
    datetime: "Thu, 5:00pm - 7:00pm",
  },
  {
    _id: 6,
    subject: "Mathematics",
    level: [4, 5],
    tutorName: "Kenneth Chua",
    location: "Zero Metropolitan (District Z)",
    datetime: "Fri, 5:00pm - 7:00pm",
  },
  {
    _id: 7,
    subject: "Mathematics",
    level: [1, 2, 3],
    tutorName: "Kenneth Chua",
    location: "Zero Metropolitan (District Z)",
    datetime: "Sat, 5:00pm - 7:00pm",
  },
  {
    _id: 8,
    subject: "Mandarin",
    level: [1, 2, 3],
    tutorName: "Shauna Ng",
    location: "Pagoda Tower, 2nd Floor",
    datetime: "Tue, 8:30pm - 10:00pm",
  },
  {
    _id: 9,
    subject: "Mandarin",
    level: [4, 5, 6],
    tutorName: "Shauna Ng",
    location: "Pagoda Tower, 2nd Floor",
    datetime: "Thu, 8:30pm - 10:00pm",
  },
  {
    _id: 10,
    subject: "History",
    level: [7, 8],
    tutorName: "Shauna Ng",
    location: "Liam Choo Ave 3",
    datetime: "Sat, 9:00am - 11:00am",
  },
  {
    _id: 11,
    subject: "History",
    level: [10, 11],
    tutorName: "Albert Shaw Jr",
    location: "Pagoda Tower, 4th Floor",
    datetime: "Sun, 9:00pm - 11:30pm",
  },
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
