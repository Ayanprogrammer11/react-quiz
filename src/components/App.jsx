import { useEffect, useReducer, useRef } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import EndScreen from "./EndScreen";
import Timer from "./Timer";
const initialState = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timerCount: 10 * 60,
};

function reducer(state, action) {
  function finishQuiz() {
    const isNeedUpdate = state.points > state.highscore;
    return {
      ...state,
      status: "finished",
      answer: null,
      highscore: isNeedUpdate ? state.points : state.highscore,
    };
  }
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finishQuiz":
      return finishQuiz();
    case "restartQuiz":
      return {
        ...state,
        index: 0,
        status: "active",
        points: 0,
        timerCount: 10,
      };
    case "setTimer":
      return { ...state, timerCount: state.timerCount - 1 };
    case "timedOut":
      return finishQuiz();
    default:
      throw new Error("Dispatched Action type Unknown!");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, timerCount },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              answer={answer}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Timer dispatch={dispatch} timerCount={timerCount} />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
        {status === "finished" && (
          <EndScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
