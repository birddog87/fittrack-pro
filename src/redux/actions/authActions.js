// src/redux/actions/authActions.js

import { auth, db } from "../../firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Action Types
export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const LOGOUT = "LOGOUT";

// Action Creators
export const authStart = () => ({ type: AUTH_START });
export const authSuccess = (user) => ({ type: AUTH_SUCCESS, payload: user });
export const authFail = (error) => ({ type: AUTH_FAIL, payload: error });
export const logoutAction = () => ({ type: LOGOUT });

// Thunk Actions
export const register = (email, password, additionalData) => async (dispatch) => {
  dispatch(authStart());
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Create user profile in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      ...additionalData,
    });
    dispatch(authSuccess(user));
  } catch (error) {
    dispatch(authFail(error.message));
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch(authStart());
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    dispatch(authSuccess(user));
  } catch (error) {
    dispatch(authFail(error.message));
  }
};

export const logout = () => async (dispatch) => {
  await signOut(auth);
  dispatch(logoutAction());
};
