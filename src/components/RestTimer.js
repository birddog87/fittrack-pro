// src/components/RestTimer.js

import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";

const RestTimer = ({ duration = 60 }) => { // default 60 seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timer = null;
    if (active && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setActive(false);
    }
    return () => clearInterval(timer);
  }, [active, timeLeft]);

  const startTimer = () => {
    setTimeLeft(duration);
    setActive(true);
  };

  const resetTimer = () => {
    setActive(false);
    setTimeLeft(duration);
  };

  return (
    <div>
      <Typography variant="h5">{timeLeft} seconds left</Typography>
      {!active ? (
        <Button variant="contained" color="primary" onClick={startTimer}>
          Start Rest
        </Button>
      ) : (
        <Button variant="contained" color="secondary" onClick={resetTimer}>
          Reset Timer
        </Button>
      )}
    </div>
  );
};

export default RestTimer;
