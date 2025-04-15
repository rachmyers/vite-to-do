import React, {useActionState} from 'react';
import getAllTasks from '../actions/actions';
import { useFormStatus } from 'react-dom';

async function initialState (previousState) {
  return previousState + 1;
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

function TodoForm() {
  const [state, formAction] = useActionState(getAllTasks, initialState);
  return (
    <form>
    {state}
 
      {state.Message ? <p className="mb-2">{getAllTasks}</p> : null}
      <div className='join w-full mb-8'>
        <input 
          type="text"
          className="input input-bordered join-item w-full"
          placeholder="type here"
          name="content"
          required
          value={getAllTasks}  
        />
        <SubmitBtn formAction={formAction} />
      </div>
    </form>
  )
}
export default TodoForm