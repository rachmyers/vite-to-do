import { type TodosType } from "../types/TodoType.js";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getAllTasks = async (): Promise<TodosType[]> => {
  try {
    const response = await fetch(`${VITE_API_URL}/api/todoitems`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return (await response.json()) as Promise<TodosType[]>;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};

export const createTask = async (taskText: string): Promise<TodosType> => {
  try {
    const response = await fetch(`${VITE_API_URL}/api/todoitems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: taskText }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = (await response.json()) as Promise<TodosType>;
    return data;
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error; // rethrow to handle in UI
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    const response = await fetch(`${VITE_API_URL}/api/todoitems/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // Only parse JSON if there is content
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
};

export const updateTask = async (task: TodosType): Promise<TodosType> => {
  try {
    const response = await fetch(`${VITE_API_URL}/api/todoitems/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: task.id,
        name: task.name,
        isComplete: task.isComplete,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = (await response.json()) as Promise<TodosType>;
    return data;
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
};
