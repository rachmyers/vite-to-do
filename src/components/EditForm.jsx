import React, { useState, useEffect } from "react";
import { updateTask } from "../actions/actions";
//import PropTypes from 'index';
import { useDispatch } from "react-redux";

const EditForm = ({ taskProp }) => {
  const { id, name, isComplete } = taskProp;
  //if (!task) {return;}
  //const {id, content, completed} = task;
  //const [tasks, setTasks] = useState([])
  const [task, setTask] = useState(taskProp);
  console.log("ID: " + id);
  console.log("Content: " + name);
  console.log("Completed: " + isComplete);
  console.log(task);
  const handleChange = (e) => {
    console.log(e);
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const handleEdit = async () => {
    if (!task.name.trim()) return;

    try {
      const editedToDo = await updateTask(task);
      console.log("Edit task:", editedToDo);
      // setTask("");
      // setTasks((prevTasks) => [...prevTasks, editedToDo]);
    } catch (error) {
      console.error("Error creating task in UI:", error);
    }
  };
  return (
    <form
      action={handleEdit}
      className="max-w-sm p-12 border border-base-300 rounded-md"
    >
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        name="name"
        value={task.name}
        required
        className="input input-bordered w-full"
      />
      <div className="form-control my-4">
        <label className="label cursor-pointer" htmlFor="completed">
          <span className="label-text">Completed</span>
          <input
            type="checkbox"
            id="completed"
            name="isComplete"
            onChange={(e) => handleChange(e)}
            value={task.isComplete}
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
