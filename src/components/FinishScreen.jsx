import { useEffect } from "react";
import Review from "./Review";
import { useQuestions } from "../contexts/QuestionsContext";

function FinishScreen() {
  const { points, dispatch, highscore, questions } = useQuestions();
  const maxPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );
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

      <Review />
    </>
  );
}

export default FinishScreen;
