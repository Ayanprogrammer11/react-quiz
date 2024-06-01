import { createContext, useContext, useEffect, useReducer } from "react";

const QuestionsContext = createContext();

const initialState = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  answers: [],
  points: 0,
  secondsRemaining: null,
  highscore: +localStorage.getItem("highscore") || null,
};
const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
      const exponentialIncrease = (arr) => {
        const array = [...arr];

        for (let i = 0; i < 35000; i++) {
          array.push(...arr);
        }
        return array;
      };
      return {
        ...state,
        questions: shuffle(action.payload),
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        answers: [...state.answers, action.payload],
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        answer: null,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        highscore:
          state.secondsRemaining === 0
            ? Math.max(state.points, state.highscore)
            : state.highscore,
      };

    default:
      throw new Error("Dispatched Action type Unknown!");
  }
}

function QuestionsProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      answers,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        answers,
        points,
        highscore,
        secondsRemaining,
        dispatch,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

function useQuestions() {
  const contextValue = useContext(QuestionsContext);
  if (contextValue === undefined)
    throw new Error("Context value can't be used outside of its provider!");
  return contextValue;
}

export { QuestionsProvider, useQuestions };
