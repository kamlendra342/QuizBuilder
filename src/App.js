import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import Startscreen from "./Startscreen.js";
import Question from "./Question.js";


function Reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" }
    case "dataFailed":
      return { ...state, status: "Failed" }
    case "start":
      return { ...state, status: "active" }
    default:
      throw new Error("Action Unknow")
  }
}

export default function App() {
  const initialisation = {
    questions: [],
    status:"loading",
  }

  const [{questions,status}, dispatch] = useReducer(Reducer, initialisation);

  useEffect(function () {
    fetch("http://localhost:8000/questions").then((res) => res.json()).then((data) => {dispatch({type:"dataReceived",payload:data})}).catch(err => {dispatch({type:"dataFailed"})});
  }, [])
  const numquestions = questions.length;

  return <div className="app">
    <Header />
    <Main>
      {status==="loading" && <Loader />}
      {status === "Failed" && <Error />}
      {status === "ready" && <Startscreen numquestions={numquestions} dispatch={dispatch} />}
      {status === "active" && <Question questions={questions} />}
    </Main>
  </div>
}