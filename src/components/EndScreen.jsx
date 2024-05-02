function EndScreen({ points, maxPossiblePoints, dispatch, highscore }) {
  return (
    <>
      <p className="result">
        <span>
          You scored {points} out of {maxPossiblePoints} points (
          {Math.round((points / maxPossiblePoints) * 100)}%)
        </span>
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restartQuiz" })}
      >
        Restart
      </button>
    </>
  );
}

export default EndScreen;
