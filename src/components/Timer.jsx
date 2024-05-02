import { useEffect, useRef } from "react";

function Timer({ dispatch, timerCount }) {
  const timerRef = useRef(null);

  function formatSeconds(seconds) {
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Pad minutes and seconds with leading zeros if needed
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    // Format the output string
    const output = `${formattedMinutes}:${formattedSeconds}`;

    return output;
  }

  useEffect(
    function () {
      const timerId = setInterval(function () {
        dispatch({ type: "setTimer" });
      }, 1000);
      timerRef.current = timerId;

      return function () {
        clearInterval(timerRef.current);
      };
    },
    [dispatch]
  );

  useEffect(
    function () {
      if (timerCount === 0) {
        clearInterval(timerRef.current);
        dispatch({ type: "timedOut" });
      }
    },
    [timerCount, dispatch]
  );

  return <div className="timer">{formatSeconds(timerCount)}</div>;
}

export default Timer;
