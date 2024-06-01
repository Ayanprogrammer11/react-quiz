import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Timer from "./Timer";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import { useQuestions } from "../contexts/QuestionsContext";

function App() {
  const { status } = useQuestions();

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" ? <Loader /> : null}
        {status === "error" ? <Error /> : null}
        {status === "ready" ? <StartScreen /> : null}
        {status === "active" ? (
          //
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        ) : null}
        {status === "finished" ? (
          <>
            <FinishScreen />
          </>
        ) : null}
      </Main>
    </div>
  );
}

export default App;
