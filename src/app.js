import React, { useReducer, useEffect} from "react";
import styled from "styled-components";

import { Quizcontext } from "./components/quizcontext";
import Question from "./components/question";
import Results from "./components/results";

import Quiz from "../animalquiz.json";

const QuizWrapper = styled.section`
  max-width: 500px;
  margin: 50px auto;
`;

export default function App(props) {
  let initialState = {
    title: Quiz.title,
    questions: Quiz.questions,
    highlightcolor: Quiz.highlightcolor || "rgb(51 51 51)",
    activeQuestion: 0,
    submitted: false,
    results: {
      right: 0,
      wrong: 0,
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    document.body.style.backgroundColor = state.highlightcolor;

  }, []);


  function reducer(state, action) {
    switch (action.type) {
      case "submitQuestion":
        return { ...state, ...action.payload };
      case "nextQuestion":
        const nextState = state;
        nextState.activeQuestion = nextState.activeQuestion + 1;
        nextState.submitted = false;
        return { ...state, ...nextState };
      default:
        return state;
    }
  }
  return (
    <Quizcontext.Provider value={{ state, dispatch }}>
      <QuizWrapper>
        <h1>{state.title}</h1>
        {state.questions.length >= state.activeQuestion + 1 && (
          <Question item={state.questions[state.activeQuestion]} />
        )}
        {state.questions.length < state.activeQuestion + 1 && <Results />}
      </QuizWrapper>
    </Quizcontext.Provider>
  );
}
