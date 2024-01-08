// Import necessary dependencies from Firebase
import React, { useState, useEffect } from "react";

function LogoutTimer({ initialTime = 300, onTimeout }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          if (onTimeout) {
            onTimeout();
          }
          return prevTime;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [onTimeout]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <div className="logout-timer-div">
      <p className="logout-timer">
        You will be logged out in
        <span className="timer"> {formatTime(time)}</span>
      </p>
    </div>
  );
}

export default LogoutTimer;
