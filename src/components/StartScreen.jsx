import { useQuestions } from "../contexts/QuestionsContext";

function StartScreen() {
  const { dispatch, questions } = useQuestions();
  const numQuestions = questions.length;
  return (
    <div className="start">
      <h2>Welcome to The QuizWizz!</h2>
      <h3>{numQuestions} questions to test your react mastery!</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
