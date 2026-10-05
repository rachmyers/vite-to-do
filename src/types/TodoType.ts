import type { Dispatch, SetStateAction } from "react";

export interface TodosType {
  id: number;
  name: string;
  isComplete: boolean;
}

export type TodosProps = {
  tasks: TodosType[];
  setTasks: Dispatch<SetStateAction<TodosType[]>>;
};

export type EditTodosProps = {
  task: TodosType;
  setTasks: Dispatch<SetStateAction<TodosType[]>>;
};

export type EditTodosForm = {
  taskProp: TodosType;
  setTasks: Dispatch<SetStateAction<TodosType[]>>;
  setShowEditForm: Dispatch<SetStateAction<boolean>>;
};
