import { useQuestions } from "../contexts/QuestionsContext";
import { truncateFromMiddle } from "../lib/utility";

function Review() {
  const { answers, questions } = useQuestions();
  const correctNums = questions.reduce((acc, question, questionIndex) => {
    const answerIndex = questionIndex;
    return question.correctOption === answers[answerIndex] ? acc + 1 : acc;
  }, 0);

  // Rest of the code

  return (
    <div className="review">
      <div className="result" style={{ backgroundColor: "#ffa94d" }}>
        <span>REVIEW</span>
      </div>
      {correctNums === questions.length ? (
        <h4 className="review-correct">You got all of the questions correct</h4>
      ) : (
        <h4 className="review-correct">
          You got <strong>{correctNums}</strong>{" "}
          {correctNums > 1 ? "questions" : "question"} correct out of{" "}
          <strong>{questions.length}</strong> questions
        </h4>
      )}
      <ul className="review-list">
        {questions.map((question, questionIndex) => (
          <li
            className={`review-list-item ${
              question.correctOption === answers[questionIndex]
                ? "correct"
                : "wrong"
            }`}
            key={question.id}
          >
            <div>
              <span>
                <strong>{questionIndex + 1}. </strong>
              </span>
              <span>
                {
                  truncateFromMiddle(
                    question.question,
                    50,
                    question.options[answers[questionIndex]],
                    40
                  )[0]
                }
              </span>
            </div>
            {question.correctOption === answers[questionIndex] ? (
              <p>
                <strong>
                  {" "}
                  ✅{" "}
                  {
                    truncateFromMiddle(
                      question.question,
                      50,
                      question.options[answers[questionIndex]],
                      40
                    )[1]
                  }
                </strong>
              </p>
            ) : (
              <>
                <p>
                  <strong>
                    {" "}
                    ❌{" "}
                    {
                      truncateFromMiddle(
                        question.question,
                        50,
                        question.options[answers[questionIndex]],
                        40
                      )[1]
                    }
                  </strong>
                </p>
                <p>
                  <strong>
                    {" "}
                    ✅{" "}
                    {
                      truncateFromMiddle(
                        question.question,
                        50,
                        question.options[question.correctOption],
                        40
                      )[1]
                    }
                  </strong>
                </p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Review;
