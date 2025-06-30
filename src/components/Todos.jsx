import React, {useEffect, useState} from 'react';
import { getAllTasks } from '../actions/actions';
import DeleteForm from './DeleteForm';
import EditButton from './EditButton.jsx';


const Todos = ({tasks, setTasks}) => {
    
  
    //const [count, setCount] = useState(0);
  //  console.log(tasks);

 
    try {

       // const tasks = await getAllTasks();
        console.log("tasks length:" + tasks.length);
        if (tasks.length === 0) {
            return <h2 className="mt-8 font-medium text-lg">No tasks to show</h2>;
        }

        return (
            <>
          
            <ul>
                {tasks.map((task) => (
                    
                    <li
                        key={task.id}
                        className="flex justify-between items-center px-6 py-4 mb-4 border border-base-300 rounded-lg shadow-lg"
                    >
                        <h2 className={`capitalize ${task.completed ? 'line-through' : ''}`}>
                            {task.name}
                        </h2>
                        <DeleteForm id={task.id} setTasks={setTasks}/>
                        <EditButton task={task.id} />
                    </li>
                ))}
            </ul>
            </>
        );
       
    } 
   
    catch (error) {
        // Log the error to the console
        console.error('Error rendering tasks:', error);
        console.log("tasks", tasks)
        // Provide a fallback UI
        return (
            <div className="mt-8 text-center">
                <h2 className="font-medium text-lg text-red-500">Error loading tasks</h2>
                <p className="text-sm text-gray-500">Please try again later.</p>
            </div>
        );
    }
    
};

export default Todos;