import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from '../redux/reducers/authSlice';


export default function TempCounter() {

 const counter = useSelector(state => state.auth.value)
const dispatch = useDispatch();

console.log(counter)
 
  return (
    <>
    <div>Counter {counter}</div>
    <div><button onClick={()=> dispatch(increment())}>increment</button></div>
    <div><button onClick={()=>dispatch(decrement())}>Decrement </button></div>
    <div><button onClick={()=>dispatch(incrementByAmount(5))}>increment by 5</button></div>
    </>
  )
}
