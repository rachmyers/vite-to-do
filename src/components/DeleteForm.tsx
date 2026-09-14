import React, { type SyntheticEvent } from "react";
import { deleteTask } from "../actions/actions.js";

interface DeleteFormProps {
  id: number;
  onDelete: (id: number) => void;
}

const DeleteForm = ({ id, onDelete }: DeleteFormProps) => {
  const handleDelete = async (e: SyntheticEvent) => {
    e.preventDefault(); // prevent form submission

    try {
      await deleteTask(id);
      if (onDelete) {
        onDelete(id); // notify parent to remove the item from the list
      }
    } catch (error) {
      alert("Failed to delete task." + error);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="btn btn-xs btn-error">
        Delete
      </button>
    </form>
  );
};

export default DeleteForm;
