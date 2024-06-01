import { useEffect } from "react";
import { useQuestions } from "../contexts/QuestionsContext";

function Timer() {
  const { dispatch, secondsRemaining } = useQuestions();
  const hours = Math.floor(secondsRemaining / (60 * 60));
  const minutes = hours % 60;
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {hours < 1 ? null : hours < 10 ? `0${hours}:` : `${hours}:`}
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}

export default Timer;
