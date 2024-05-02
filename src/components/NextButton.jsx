function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return;
  const isLast = index + 1 === numQuestions;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: isLast ? "finish" : "nextQuestion" })}
    >
      {isLast ? "Finish" : "Next"}
    </button>
  );
}

export default NextButton;
