import { useEffect } from "react";
import Review from "./Review";

function FinishScreen({
  points,
  maxPossiblePoints,
  dispatch,
  highscore,
  answers,
  questions,
}) {
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  useEffect(
    function () {
      localStorage.setItem("highscore", highscore + "");
    },
    [highscore]
  );

  return (
    <>
      <div className="container">
        <p className="result" style={{ width: "70%" }}>
          <span>
            {emoji} You scored <strong>{points}</strong> out of{" "}
            {maxPossiblePoints} points ({percentage}%)
          </span>
        </p>
      </div>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <div className="container">
        <button className="btn" onClick={() => dispatch({ type: "restart" })}>
          Restart Quiz
        </button>
      </div>

      <Review answers={answers} questions={questions} />
    </>
  );
}

export default FinishScreen;
