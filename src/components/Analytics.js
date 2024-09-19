// src/components/Analytics.js

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";

const Analytics = () => {
  const workouts = useSelector((state) => state.workout.workouts);
  const [timeframe, setTimeframe] = useState("weekly");
  const [data, setData] = useState([]);

  useEffect(() => {
    // Process workouts based on timeframe
    const groupedData = {};

    workouts.forEach((workout) => {
      const date = parseISO(workout.date);
      let key;
      if (timeframe === "weekly") {
        const week = format(date, "yyyy-ww");
        key = `Week ${format(date, "ww")}`;
      } else if (timeframe === "monthly") {
        key = format(date, "MMMM yyyy");
      } else if (timeframe === "yearly") {
        key = format(date, "yyyy");
      }

      if (groupedData[key]) {
        groupedData[key] += workout.duration;
      } else {
        groupedData[key] = workout.duration;
      }
    });

    const chartData = Object.keys(groupedData).map((key) => ({
      timeframe: key,
      duration: groupedData[key],
    }));

    setData(chartData);
  }, [workouts, timeframe]);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Workout Analytics</Typography>
      <FormControl variant="outlined" style={{ minWidth: 120, marginBottom: 20 }}>
        <InputLabel>Timeframe</InputLabel>
        <Select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          label="Timeframe"
        >
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </Select>
      </FormControl>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeframe" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="duration" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default Analytics;
