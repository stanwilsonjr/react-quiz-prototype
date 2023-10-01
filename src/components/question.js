import React, { useContext,useState} from "react";
import { Quizcontext } from "./quizcontext";
import styled from "styled-components";


const QuestionContainer = styled.section`
    display:flex;
    flex-direction: column;
    & h2{
      font-family: 'Inter', sans-serif;
      font-weight:800;
    }
    & div.next{
      background: #333;
      color: #fff;
      padding: 7px;
      display: inline-block;
      border-radius: 5px;
      cursor: pointer;
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
      opacity: 1;

      &:hover{
        background-color: ${props => (props.submitted)? 'green': "#333"};
        color:#fff;
      }
    }
    & div{
        border-radius: 10px;
        padding: 7px 10px;
        min-height: 75px;
        opacity: ${props => (props.submitted)? '0.5': "1"};
        cursor: ${props => (props.submitted)? 'not-allowed': "pointer"};
        background-color: #fff;
        font-family: 'Inter', sans-serif;
        font-weight:400;
        transition: transform 0.5s linear;
        &:hover{
            background-color: ${props => (props.submitted)? '#fff': "#333"};
            color: ${props => (props.submitted)? '#333': "#fff"};
        }
        @keyframes reveal {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
      }
    }

`;
const ResultSection= styled.section`
    max-width: 500px;
    display: flex;
    flex-direction: column;
    & h3{
      border-color:${props => (props.result === 'wrong')? "red" :(props.result == 'right')? "green" : 'transparent'};
      border-width: 0 0  0 5px;
      border-style: solid;
      padding: 5px 5px 5px 10px;
    }
    & div{
      align-self: flex-end;
    }
`;

export default function Question(props) {
  const { item } = props;
  const [resultValue, setResult] = useState(null);

  const context = useContext(Quizcontext);
  const activeQuestion = context.state.questions[context.state.activeQuestion];
  const previousText  =  (context.state.activeQuestion === 9)? "See your Results" : "Next Question";

 
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
      { context.state.submitted  &&
        <ResultSection  result={resultValue} >
          <h3>{context.state.questions[context.state.activeQuestion].answer.explanation}</h3>
          <div className="next" onClick={()=>  context.dispatch({type:"nextQuestion"}) }> {previousText}  </div>
        </ResultSection>
      }
      <Answers  correct={activeQuestion.answer.number } submitted={context.state.submitted}>
        {item.choices.map((c, i) => (
          <div onClick={() => submitAnswer(i)} key={`choice-${i}`}  style={{animationDelay: `${i * 0.25}s`}}  >{c}</div>
        ))}
      </Answers>
      <span>{context.state.activeQuestion + 1}/{context.state.questions.length} </span>
  

    </QuestionContainer>
  );
}
