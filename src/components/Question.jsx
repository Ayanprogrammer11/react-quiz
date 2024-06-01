import { memo } from "react";
import { useQuestions } from "../contexts/QuestionsContext";
import Options from "./Options";

const Question = memo(function Question({ index, questions }) {
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
});

// Split the component into 2, the outer component reads the required context value and passes it to the memoized child component as prop

function QuestionContextWrapper() {
  const { index, questions } = useQuestions();

  return <Question index={index} questions={questions} />;
}

export default QuestionContextWrapper;
