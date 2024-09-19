// src/pages/Dashboard.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkouts } from "../redux/actions/workoutActions";
import { Container, Typography, List, ListItem, ListItemText, Grid } from "@mui/material";
import AddWorkout from "../components/AddWorkout";
import Analytics from "../components/Analytics";

const Dashboard = () => {
  const dispatch = useDispatch();
  const workoutState = useSelector((state) => state.workout);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.user) {
      dispatch(fetchWorkouts(auth.user.uid));
    }
  }, [dispatch, auth.user]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome, {auth.user.email}
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <AddWorkout />
          {workoutState.loading && <Typography>Loading...</Typography>}
          {workoutState.error && <Typography color="error">{workoutState.error}</Typography>}
          <List>
            {workoutState.workouts.map((workout) => (
              <ListItem key={workout.id} divider>
                <ListItemText 
                  primary={workout.name} 
                  secondary={`${new Date(workout.date).toLocaleDateString()} - ${workout.duration} mins`} 
                />
                {/* Placeholder for Edit and Delete buttons */}
                {/* You can implement EditWorkout and DeleteWorkout components here */}
              </ListItem>
            ))}
          </List>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Analytics />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
