// src/redux/actions/workoutActions.js

import { db } from "../../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Action Types
export const WORKOUTS_FETCH_START = "WORKOUTS_FETCH_START";
export const WORKOUTS_FETCH_SUCCESS = "WORKOUTS_FETCH_SUCCESS";
export const WORKOUTS_FETCH_FAIL = "WORKOUTS_FETCH_FAIL";

// Action Creators
export const workoutsFetchStart = () => ({ type: WORKOUTS_FETCH_START });
export const workoutsFetchSuccess = (workouts) => ({ type: WORKOUTS_FETCH_SUCCESS, payload: workouts });
export const workoutsFetchFail = (error) => ({ type: WORKOUTS_FETCH_FAIL, payload: error });

// Thunk Actions
export const fetchWorkouts = (userId) => async (dispatch) => {
  dispatch(workoutsFetchStart());
  try {
    const q = query(collection(db, "workouts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const workouts = [];
    querySnapshot.forEach((doc) => {
      workouts.push({ id: doc.id, ...doc.data() });
    });
    dispatch(workoutsFetchSuccess(workouts));
  } catch (error) {
    dispatch(workoutsFetchFail(error.message));
  }
};

// Similarly, add actions for adding, editing, deleting workouts
