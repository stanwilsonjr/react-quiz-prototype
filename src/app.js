import React, { useReducer } from "react";
import styled from "styled-components";

import { Quizcontext } from "./components/quizcontext";
import  Question from "./components/question";
import  Results from "./components/results";

import Quiz from "../animalquiz.json";


const QuizWrapper= styled.section`
    max-width: 500px;
    margin: 50px auto;
 
`;



export default function App(props) {
  let initialState = {
    title: Quiz.title,
    questions: Quiz.questions,
    activeQuestion: 0,
    submitted: false,
    results: {
        right: 0,
        wrong: 0
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "submitQuestion":
        return { ...state, ...action.payload };
      case "nextQuestion":
        const nextState  = state;
        nextState.activeQuestion = nextState.activeQuestion+1;
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

        {/* <svg viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#444"
                  stroke-width="1"
                />
        </svg> */}

      {state.questions.length >= (state.activeQuestion + 1) && 
        <Question item={state.questions[state.activeQuestion]}  /> 
      }
      {state.questions.length < (state.activeQuestion + 1) && 
        <Results/> 
      }
    </QuizWrapper>
    </Quizcontext.Provider>
  );
}
