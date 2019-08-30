import { createStore } from "redux";

export default function(initialState) {
  const store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
      case "add":
        return { count: state.count + 1 };
      default:
        return state;
    }
  }, initialState);

  return store;
}
