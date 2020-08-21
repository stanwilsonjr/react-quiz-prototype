import React, { useContext,useState} from "react";
import { Quizcontext } from "./quizcontext";
import styled from "styled-components";

const ResultsContainer = styled.section`
display:flex;
flex-direction: column;
  &  circle{
      stroke-dasharray: ${props =>  props.percent * 100 } , 100;
      stroke: green;
      stroke-width: 10px;
  }
`;
// https://medium.com/@pppped/how-to-code-a-responsive-circular-percentage-chart-with-svg-and-css-3632f8cd7705
export default function Results() {

  const context = useContext(Quizcontext);
  const percentageCorrect = context.state.results.right / context.state.questions.length;
  return (
    <ResultsContainer percent={ percentageCorrect}>
      <h2>Your Results:  {  `${percentageCorrect * 100}% Correct` } </h2>
       
    </ResultsContainer>
  );
}
