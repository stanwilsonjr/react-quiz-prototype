import React, { useContext,useState} from "react";
import { Quizcontext } from "./quizcontext";
import styled from "styled-components";

 

export default function Results() {

  const context = useContext(Quizcontext);
  return (
    <div>
      <h2>Your Results</h2>
        {  `${(context.state.results.right / context.state.questions.length) * 100}% Correct` }
    </div>
  );
}
