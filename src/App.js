import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import Startscreen from "./Startscreen.js";
import Question from "./Question.js";
import NextButton from "./NextButton.js";
import Progress from "./progress.js";
import Finishscreen from "./finishscreen.js";
import Footer from "./Footer.js";
import Timer from "./timer.js";

const initialisation = {
  questions: [],
  status: "loading",
  answer:null,
  index: 0,
  points: 0,
  highscore: 0,
  SecoundRemaining: 360,
}

function Reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" }
    case "dataFailed":
      return { ...state, status: "Failed" }
    case "start":
      return { ...state, status: "active" }
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state, answer: action.payload,
        points: action.payload=== question.correctOption ? state.points + question.points : state.points
      }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null }
    case "finish":
      return { ...state, status: "finish", highscore: state.points > state.highscore ? state.points : state.highscore }
    case "restart":
      return {
        ...state,status:"ready",
        answer: null,
        index: 0,
        points: 0,
        SecoundRemaining:360,
      }
      case "tick":
        return { ...state, SecoundRemaining:state.SecoundRemaining-1,status : state.SecoundRemaining <= 0 ? "finish" : state.status,highscore: state.points > state.highscore ? state.points : state.highscore}
    default:
      throw new Error("Action Unknow")
  }
}

export default function App() {
  const [{questions,status,index,answer,points,highscore,SecoundRemaining}, dispatch] = useReducer(Reducer, initialisation);

  useEffect(function () {
    fetch("http://localhost:8000/questions").then((res) => res.json()).then((data) => {dispatch({type:"dataReceived",payload:data})}).catch(err => {dispatch({type:"dataFailed"})});
  }, [])
  const numquestions = questions.length;
  const maxposiblepoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  return <div className="app">
    <Header />
    <Main>
      {status === "finish" && <Finishscreen points={points} maxposiblepoints={maxposiblepoints} highscore={ highscore} dispatch={dispatch}/>}
      {status==="loading" && <Loader />}
      {status === "Failed" && <Error />}
      {status === "ready" && <Startscreen numquestions={numquestions} dispatch={dispatch} />}
      {status === "active" &&
      <>
        <Progress index={index} numquestions={numquestions} points={points} maxposiblepoints={maxposiblepoints} answer={answer}/>

        <Question questions={questions[index]} dispatch={dispatch} answer={answer} />
        <Footer dispatch={dispatch}>
          <Timer dispatch={dispatch} SecoundRemaining={SecoundRemaining} />
          <NextButton dispatch={dispatch} answer={answer} index={index} />
        </Footer>
      </>}
    </Main>
  </div>
}