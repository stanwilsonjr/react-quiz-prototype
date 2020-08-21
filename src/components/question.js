import React, { useContext,useState} from "react";
import { Quizcontext } from "./quizcontext";
import styled from "styled-components";


const QuestionContainer = styled.section`
    display:flex;
    flex-direction: column;
    & h2{
      font-family: 'Open Sans', sans-serif;
      font-weight:800;

    }
`;
const Answers = styled.section`
    display: grid;
    grid-template-columns: 2fr 2fr;
    max-width: 500px;
    flex-wrap: wrap;
    column-gap:10px;
    row-gap: 10px;
    margin: 25px 0;
    & div:nth-child(${props => (props.correct + 1)}){
      background-color: ${props => (props.submitted)? 'green': "#fff"};
      color: ${props => (props.submitted)? '#fff': "#333"};
      &:hover{
        background-color: ${props => (props.submitted)? 'green': "#333"};
        color:#fff;
      }
    }
    & div{
        border-radius: 10px;
        padding: 7px 10px;
        min-height: 75px;
        cursor: ${props => (props.submitted)? 'not-allowed': "pointer"};
        background-color: #fff;
        font-family: 'Open Sans', sans-serif;
        font-weight:400;
        transition: transform 0.5s linear;

        &:hover{
            background-color: ${props => (props.submitted)? '#fff': "#333"};
            color: ${props => (props.submitted)? '#333': "#fff"};
        }
    }
`;
const ResultSection= styled.section`
    max-width: 500px;

    & h3{
      border-color:${props => (props.result === 'wrong')? "red" :(props.result == 'right')? "green" : 'transparent'};
      border-width: 0 0  0 5px;
      border-style: solid;
      padding: 5px 5px 5px 10px;
    }
`;

export default function Question(props) {
  const { item } = props;
  const [resultValue, setResult] = useState(null);

  const context = useContext(Quizcontext);
  const activeQuestion = context.state.questions[context.state.activeQuestion];

 
  function submitAnswer(i){
    let newState = context.state;
    const result = (activeQuestion.answer.number == i)? "right" : "wrong";
    setResult(result);
    newState.results[result]++
    newState.submitted = true;
    context.dispatch({type:"submitQuestion",payload:newState})
  }

  return (
    <QuestionContainer>
      <h2>{item.question}</h2>
      <Answers correct={activeQuestion.answer.number } submitted={context.state.submitted}>
        {item.choices.map((c, i) => (
          <div onClick={() => submitAnswer(i)} key={`choice-${i}`}>{c}</div>
        ))}
      </Answers>
      <span>{context.state.activeQuestion + 1}/{context.state.questions.length} </span>
      { context.state.submitted  &&
        <ResultSection  result={resultValue} >
          <h3>{context.state.questions[context.state.activeQuestion].answer.explaination}</h3>
          <div onClick={()=>  context.dispatch({type:"nextQuestion"}) }>   Next Question</div>
        </ResultSection>
      }

    </QuestionContainer>
  );
}
