// src/components/AddWorkout.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { fetchWorkouts } from "../redux/actions/workoutActions";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import RestTimer from "./RestTimer";

// Inside the component's return statement, perhaps after adding a workout
<RestTimer duration={60} /> {/* Duration can be customizable */}


const AddWorkout = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, "workouts"), {
        userId: auth.user.uid,
        name: workoutName,
        date,
        duration,
        createdAt: new Date(),
      });
      dispatch(fetchWorkouts(auth.user.uid));
      setOpen(false);
      setWorkoutName("");
      setDate("");
      setDuration("");
    } catch (error) {
      console.error("Error adding workout: ", error);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Workout
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Workout</DialogTitle>
        <DialogContent>
          <TextField 
            label="Workout Name" 
            fullWidth 
            margin="normal" 
            value={workoutName} 
            onChange={(e) => setWorkoutName(e.target.value)} 
            required 
          />
          <TextField 
            label="Date" 
            type="date" 
            fullWidth 
            margin="normal" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            InputLabelProps={{ shrink: true }}
            required 
          />
          <TextField 
            label="Duration (minutes)" 
            type="number" 
            fullWidth 
            margin="normal" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)} 
            required 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddWorkout;
