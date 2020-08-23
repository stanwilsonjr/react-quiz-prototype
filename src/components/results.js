import React, { useContext,useState} from "react";
import { Quizcontext } from "./quizcontext";
import styled from "styled-components";

const ResultsContainer = styled.section`
display:flex;
flex-direction: column;

  & svg {
    width: 300px;
    margin: 0 auto;
    &  .results-chart{
      stroke-dasharray: ${props =>  props.percent * 100 } , 100;
      fill: none;
      stroke-width: 4;
      stroke: green;
      animation: progress 1s ease-out forwards;
    }
    &  .results-chart-bg{
      stroke-dasharray: 100 , 100;
      fill: none;
      stroke-width: 4;
      stroke: #444;
    }
    & text{
      font-family: 'Inter', sans-serif;
      font-weight:800;
      font-size: 8px;
    }

    @keyframes progress {
        0% {
          stroke-dasharray: 0 100;
        }
    }
  }
`;

// https://medium.com/@pppped/how-to-code-a-responsive-circular-percentage-chart-with-svg-and-css-3632f8cd7705
export default function Results() {

  const context = useContext(Quizcontext);
  const percentageCorrect = context.state.results.right / context.state.questions.length;
  return (
    <ResultsContainer percent={ percentageCorrect}>
      <h2>Your Results: </h2>
      <svg viewBox="0 0 36 36">
      <path
          className="results-chart-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="results-chart"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="7" y="21.5" class="percentage">{  `${percentageCorrect * 100}%` } </text>
      </svg>
    </ResultsContainer>
  );
}
