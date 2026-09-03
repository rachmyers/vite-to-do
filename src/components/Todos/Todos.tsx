import React, {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { getAllTasks } from "../../actions/actions.js";
import DeleteForm from "../DeleteForm.jsx";
import EditButton from "../EditButton.jsx";
import styles from "./Todos.module.css";
import type { TodosType } from "../TodoForm.js";

type TodosProps = {
  tasks: TodosType[];
  setTasks: Dispatch<SetStateAction<TodosType[]>>;
};

const Todos = ({ tasks, setTasks }: TodosProps) => {
  const onDelete = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  //const [count, setCount] = useState(0);

  try {
    // const tasks = await getAllTasks();
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
              <h2
                className={`${styles.capitalize} ${task.isComplete ? styles.strikeThrough : ""}`}
              >
                {task.name}
              </h2>
              <DeleteForm id={task.id} onDelete={onDelete} />
              <EditButton task={task} setTasks={setTasks} />
            </li>
          ))}
        </ul>
      </>
    );
  } catch (error) {
    // Log the error to the console
    console.error("Error rendering tasks:", error);

    // Provide a fallback UI
    return (
      <div className="mt-8 text-center">
        <h2 className="font-medium text-lg text-red-500">
          Error loading tasks
        </h2>
        <p className="text-sm text-gray-500">Please try again later.</p>
      </div>
    );
  }
};

export default Todos;
