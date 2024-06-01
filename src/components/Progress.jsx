import { memo, useMemo } from "react";
import { useQuestions } from "../contexts/QuestionsContext";

const Progress = memo(function Progress({ questions, index, answer, points }) {
  const maxPossiblePoints = useMemo(function () {
    return questions.reduce((acc, question) => acc + question.points, 0);
  }, []);

  const numQuestions = questions.length;
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        Points: <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
});

function ProgressContextWrapper() {
  const { questions, index, answer, points } = useQuestions();

  return (
    <Progress
      questions={questions}
      index={index}
      answer={answer}
      points={points}
    />
  );
}

export default ProgressContextWrapper;
