import React, { useState, useEffect } from "react";
import { updateTask } from "../actions/actions";
//import PropTypes from 'index';
import { useDispatch } from "react-redux";

const EditForm = ({ taskProp }) => {
  const { id, name, isComplete } = taskProp;
  //if (!task) {return;}
  //const {id, content, completed} = task;
  //const [tasks, setTasks] = useState([])
  const [task, setTask] = useState("");
  console.log("ID: " + id);
  console.log("Content: " + name);
  console.log("Completed: " + isComplete);
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      const editedToDo = await updateTask(task.trim());
      console.log("Edit task:", newTodo);
      setTask("");
      setTasks((prevTasks) => [...prevTasks, editedToDo]);
    } catch (error) {
      console.error("Error creating task in UI:", error);
    }
  };
  return (
    <form
      action={handleEdit}
      className="max-w-sm p-12 border border-base-300 rounded-md"
    >
      <input name="id" value={id} />
      <input
        type="text"
        onChange={(e) => setTask(e.target.value)}
        name="name"
        value={name}
        required
        className="input input-bordered w-full"
      />
      <div className="form-control my-4">
        <label className="label cursor-pointer" htmlFor="completed">
          <span className="label-text">Completed</span>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            value={isComplete}
            className="checkbox-primary checkbox checkbox-sm"
          />
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-block btn-sm">
        edit
      </button>
    </form>
  );
};
// EditForm.propTypes = {
//     id: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     completed: PropTypes.string.isRequired,
// };

export default EditForm;
