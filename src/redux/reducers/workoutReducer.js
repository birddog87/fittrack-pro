// src/redux/reducers/workoutReducer.js

const initialState = {
  workouts: [],
  loading: false,
  error: null,
};

const workoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case "WORKOUTS_FETCH_START":
      return { ...state, loading: true, error: null };
    case "WORKOUTS_FETCH_SUCCESS":
      return { ...state, loading: false, workouts: action.payload };
    case "WORKOUTS_FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    // Add more cases for adding, editing, deleting workouts
    default:
      return state;
  }
};

export default workoutReducer;
