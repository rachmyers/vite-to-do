import React from 'react'
import { deleteTask, getAllTasks } from '../actions/actions';

const DeleteForm = ({ id, setTasks }) => {
  const handleDelete = async (e) => {
    e.preventDefault(); // prevent form submission

    try {
      await deleteTask(id);
      if (setTasks) {
        setTasks(await getAllTasks()) // notify parent to remove the item from the list
      }
    } catch (error) {
      alert('Failed to delete task.' + error);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="btn btn-xs btn-error">Delete</button>
    </form>
  );
};

export default DeleteForm;