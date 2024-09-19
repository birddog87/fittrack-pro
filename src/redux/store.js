// src/redux/store.js

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import workoutReducer from "./reducers/workoutReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  workout: workoutReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
