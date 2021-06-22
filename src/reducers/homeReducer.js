const initialState = {
  title: "Welcome To React Basic",
  content: ""
};

const homeReducer = function(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_TITLE":
      return {
        ...state,
        title: action.data
      };
    case "CHANGE_CONTENT":
      return {
        ...state,
        content: action.data
      };
    default:
      return state;
  }
};

export default homeReducer;
