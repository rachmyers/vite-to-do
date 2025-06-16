import React, {useEffect} from 'react'
import { updateTask } from '../actions/actions';
//import PropTypes from 'index';
import { useDispatch } from 'react-redux';


const EditForm = ({id, content, completed}) => {
   
    //if (!task) {return;} 
   //const {id, content, completed} = task;
   //const [tasks, setTasks] = useState([])
   console.log(id);
   return (

   <form 
   action={updateTask}
   className="max-w-sm p-12 border border-base-300 rounded-md">
    <input  name="id" value={id}/>
    <input type="text" name="content" value={content} required className="input input-bordered w-full" />
    <div className='form-control my-4'>
        <label className="label cursor-pointer" htmlFor='completed'>
            <span className="label-text">Completed</span>
            <input type="checkbox" 
            id="completed"
            name="completed"
            value={completed}
            className="checkbox-primary checkbox checkbox-sm"/>
        </label>
       
    </div>
   
    <button type="submit" className='btn btn-primary btn-block btn-sm'>edit</button>
   </form>)
  

}
// EditForm.propTypes = {
//     id: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     completed: PropTypes.string.isRequired,
// };

export default EditForm