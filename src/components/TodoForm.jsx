import React, {useState} from 'react';
import { createTask, getAllTasks } from '../actions/actions';
import { useFormStatus, useFormState } from 'react-dom';
import { useDispatch } from 'react-redux';
import {head} from 'ramda';
import Todos from './Todos';

const initialState = {
  message: null
}

const SubmitBtn = () => { 
  const {pending} = useFormStatus(); 
  return (
    <button type="submit" className='btn btn-primary join-item'
    disabled={pending}>
    {pending ? "creating..." : "create task"}
  </button>
  )
}

const TodoForm = ({onError}) => {
  const [state] = useFormState(createTask, initialState)
  const [todoName, setTodoName] = useState("")
  const dispatch = useDispatch()
  // const handleChange = async (event) => {
  //   const todoItem = Array.from(event.target.todoItem);
  //   const item = head(todoItem);
  //   try {
  //     const formData = new formData();
  //     formData.append("item", item);
  //     dispatch(getAllTasks)
  //   }
  //   catch (error) {
  //     if(onError) {
  //       onError(error)
  //     }
  //   }
  }
  return (
    <div>
    <form action = {createTask}>
      {state.Message ? <p className="mb-2">{state.message}</p> : null}
      <div className='join w-full mb-8'>
        <input 
          type="text"
          className="input input-bordered join-item w-full"
          placeholder="type here"
          value={todoName}
          onChange={ handleChange }
          required  
        />
        <SubmitBtn />
      </div>
    </form>
    <Todos />
    </div>
  )
}

export default TodoForm
