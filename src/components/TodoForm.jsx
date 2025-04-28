import React, { useState} from 'react';
import { createTask } from '../actions/actions';
import { useFormStatus, useFormState } from 'react-dom';
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

const TodoForm = () => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      const newTodo = await createTask(task.trim());
      console.log('Created task:', newTodo);
      setTask('');
    } catch (error) {
      console.error('Error creating task in UI:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="join w-full mb-8">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="input input-bordered join-item w-full"
            placeholder="type here"
            required
          />
          <SubmitBtn />
        </div>
      </form>
      <Todos />
    </div>
  );
};

export default TodoForm;
