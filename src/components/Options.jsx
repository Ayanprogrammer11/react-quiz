import { useQuestions } from "../contexts/QuestionsContext";

function Options() {
  const { dispatch, answer, questions, index } = useQuestions();
  const question = questions[index];
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={answer !== null}
          key={index}
        >
          {/*  */}
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
