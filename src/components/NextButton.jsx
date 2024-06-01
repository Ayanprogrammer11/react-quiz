import { useQuestions } from "../contexts/QuestionsContext";

function NextButton() {
  const { answer, questions, dispatch, index } = useQuestions();
  const numQuestions = questions.length;
  if (answer === null) return;
  const isLast = index + 1 === numQuestions;

  if (isLast)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish Quiz
      </button>
    );

  if (!isLast)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
}

export default NextButton;
