import { useReducer, useState } from 'react';
import './App.css';
import DigitButton from './Components/DigitButton';
import OperatorButton from './Components/OperatorButton';

const reducer=(state,{type,payload})=>{
  switch(type){
    case "ADD_OPERAND":
      if(state.currentOperand=="0" && payload=="0")
      {
        return state;
      }
      if(state?.currentOperand?.includes(".") && payload==".")
      {
        return state;
      }
      if(state.overWrite)
      {
        return {
          ...state,
          currentOperand:payload,
          overWrite:false
        }
      }
      return{
      ...state,
      currentOperand:(state.currentOperand ||"") + payload
    }
    case "ADD_OPERATOR":
      if(!state.currentOperand)
      {
        return state;
      }
      if(state.previousOperand)
      {
        const result=evaluate(state);
        return {
        ...state,
        currentOperand:"0",
        previousOperand:result,
        operator:payload,
        overWrite:true  
        }
      }
      return{
        previousOperand:state.currentOperand,
        currentOperand:"0",
        operator:payload,
        overWrite:true
    }
    case "EVALUATE":
      if(!state.currentOperand || !state.previousOperand || !state.operator)
      {
        return state;
      }
      const result=evaluate(state);
      return{
        currentOperand:result,
        previousOperand:"",
        operator:"",
        overWrite:true
      }
      case "ALL_CLEAR": return{
        ...state,
        currentOperand:"0",
        overWrite:true
      }
      case "DELETE":
        if(state.currentOperand.length==1)
        {
           return{
            ...state,
            currentOperand:"0",
            overWrite:true
           }
        }
        return{
        ...state,
        currentOperand:state.currentOperand.slice(0,-1),
      }
    default:return state;
  }
}

const evaluate=(state)=>{
 const firstNumber=parseFloat(state.previousOperand);
 const secondNumber=parseFloat(state.currentOperand);
 switch(state.operator){
  case "+":return firstNumber + secondNumber;
  case "-":return firstNumber-secondNumber;
  case "*":return firstNumber*secondNumber;
  case "/":return firstNumber/secondNumber;
  default: return "";
 }
}
function App() {
  const [count, setCount] = useState(0);
const[{previousOperand,currentOperand,operator},dispatch]=useReducer(reducer,
  {
    currentOperand:"0",
    overWrite:true
  });
  return (
    <>
    <h1>Calculator.</h1>
      <div className='calculator'>
      <div className='output'>
        <div className='previousOperand'>{previousOperand}{operator}</div>
        <div className='currentOperand'>{currentOperand}</div>
      </div>
        <button className='span-2' onClick={()=>{
          dispatch({type:"ALL_CLEAR"})
        }}>AC</button>
        <button onClick={()=>{dispatch({type:"DELETE"})}}>Del</button>
        <OperatorButton operator={"+"} dispatch={dispatch}/>
        <DigitButton  digit={"9"} dispatch={dispatch}/>
        <DigitButton digit={"8"} dispatch={dispatch}/>
        <DigitButton digit={"7"} dispatch={dispatch}/>
        <OperatorButton operator={"-"} dispatch={dispatch}/>
        <DigitButton digit={"6"} dispatch={dispatch}/>
        <DigitButton digit={"5"} dispatch={dispatch}/>
        <DigitButton digit={"4"} dispatch={dispatch}/>
        <OperatorButton operator={"*"} dispatch={dispatch}/>
        <DigitButton digit={"3"} dispatch={dispatch}/>
        <DigitButton digit={"2"} dispatch={dispatch}/>
        <DigitButton digit={"1"} dispatch={dispatch}/>
        <OperatorButton operator={"/"} dispatch={dispatch}/>
        <DigitButton digit={"."} dispatch={dispatch}/>
        <DigitButton digit={"0"} dispatch={dispatch}/>
        <button className='span-2'onClick={()=>dispatch({type:"EVALUATE"})}>=</button>
       </div>
    </>
  )
}
export default App;