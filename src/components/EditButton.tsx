import React, { useState } from "react";
import EditForm from "./EditForm.jsx";
import { type EditTodosProps } from "../types/TodoType.js";

const EditButton = ({ task, setTask }: EditTodosProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  if (!task) {
    return;
  }
  const handleToggle = () => {
    setShowEditForm(!showEditForm);
  };
  return showEditForm ? (
    <EditForm
      taskProp={task}
      setTasks={setTask}
      setShowEditForm={setShowEditForm}
    />
  ) : (
    <button
      onClick={handleToggle}
      className="btn btn-primary btn-block btn-sm max-w-sm p-12 border border-base-300 rounded-md"
    >
      edit
    </button>
  );
};

export default EditButton;
