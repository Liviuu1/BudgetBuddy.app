import React, { useState, useEffect } from "react";

function LogoutTimer({ initialTime = 300, onTimeout }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          // Call the onTimeout callback when the timer reaches 0
          if (onTimeout) {
            onTimeout();
          }
          return prevTime;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup the interval when the component is unmounted
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
    <p className="logout-timer">
      You will be logged out in{" "}
      <span className="timer">{formatTime(time)}</span>
    </p>
  );
}

export default LogoutTimer;
