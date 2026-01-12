import React, { useState, useEffect } from "react";
import { updateTask } from "../actions/actions";
//import PropTypes from 'index';
import { useDispatch } from "react-redux";
import checkbox from "daisyui/components/checkbox";

const EditForm = ({ taskProp, setTasks, setShowEditForm }) => {
  const { id, name, isComplete } = taskProp;
  //if (!task) {return;}
  //const {id, content, completed} = task;
  //const [tasks, setTasks] = useState([])
  const [task, setTask] = useState(taskProp);
  console.log(task);
  const handleChange = (e) => {
    console.log(e);
    setTask({
      ...task,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  const handleEdit = async (e) => {
    //added this line to prevent default behavior on a form-
    //keeps page from refreshing
    e.preventDefault();
    if (!task.name.trim()) return;

    try {
      const editedToDo = await updateTask(task);
      console.log("Edit task:", editedToDo);
      setTasks((prevTasks) =>
        prevTasks.map((prevTask) =>
          prevTask.id === task.id ? editedToDo : prevTask
        )
      );
    } catch (error) {
      console.error("Error creating task in UI:", error);
    }
  };
  return (
    <form
      onSubmit={handleEdit}
      className="max-w-sm p-12 border border-base-300 rounded-md"
      data-testid="editForm"
    >
      <label className="label cursor-pointer" htmlFor="name">
        <span className="label-text">Task Name</span>
        <input
          id="name"
          type="text"
          onChange={(e) => handleChange(e)}
          name="name"
          value={task.name}
          required
          className="input input-bordered w-full"
        />
      </label>
      <div className="form-control my-4">
        <label className="label cursor-pointer" htmlFor="completed">
          <span className="label-text">Completed</span>
          <input
            type="checkbox"
            id="completed"
            name="isComplete"
            onChange={(e) => handleChange(e)}
            checked={task.isComplete}
            className="checkbox-primary checkbox checkbox-sm"
          />
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-block btn-sm">
        edit
      </button>

      <button
        onClick={() => setShowEditForm(false)}
        className="btn btn-primary btn-block btn-sm"
      >
        cancel
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
