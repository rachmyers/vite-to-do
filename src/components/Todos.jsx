import React, {useEffect, useState} from 'react';
import { getAllTasks } from '../actions/actions';
import DeleteForm from './DeleteForm';
import EditButton from './EditButton.jsx';


const Todos = () => {
    
    const [tasks, setTasks] = useState([])
    const [count, setCount] = useState(0);
    console.log(tasks);
    useEffect(() => {
        const fetchData = async () => setTasks(await getAllTasks())
        //Line 11 same as lines 10 and 12, calling the function. It is a self-invoking function
        //(async() => setTasks(await getAllTasks()))()
       fetchData() 
    }, [count]
    //empty square brackets means it only runs once
   )
 
    try {

       // const tasks = await getAllTasks();

        if (tasks.length === 0) {
            return <h2 className="mt-8 font-medium text-lg">No tasks to show</h2>;
        }

        return (
            <>
            <button onClick={() => setCount(count + 1)}>{count}</button>
            <ul>
                {tasks.map((task) => (
                    
                    <li
                        key={task.id}
                        className="flex justify-between items-center px-6 py-4 mb-4 border border-base-300 rounded-lg shadow-lg"
                    >
                        <h2 className={`capitalize ${task.completed ? 'line-through' : ''}`}>
                            {task.name}
                        </h2>
                        <DeleteForm id={task.id}/>
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