import React, { useState, useEffect } from "react";
import { createTask, getAllTasks } from "../actions/actions";
import { useFormStatus, useFormState } from "react-dom";
import Todos from "./Todos";

const initialState = {
  message: null,
};

//can have multiple export consts in a file, but only one default
export const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary join-item"
      disabled={pending}
    >
      {pending ? "creating..." : "create task"}
    </button>
  );
};

const TodoForm = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  useEffect(
    () => {
      const fetchData = async () => setTasks(await getAllTasks());
      //Line 11 same as lines 10 and 12, calling the function. It is a self-invoking function
      // eslint-disable-next-line no-unexpected-multiline
      //(async() => setTasks(await getAllTasks()))()
      fetchData();
    },
    []
    //empty square brackets means it only runs once
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      const newTodo = await createTask(task.trim());
      console.log("Created task:", newTodo);
      setTask("");
      setTasks((prevTasks) => [...prevTasks, newTodo]);
    } catch (error) {
      console.error("Error creating task in UI:", error);
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
      <Todos tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

//export default is the main thing exported from this file
//when imported, doesn't need the curly braces
export default TodoForm;
