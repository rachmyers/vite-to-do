import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

// Mock the actions module BEFORE importing the component and functions
vi.mock("../actions/actions.js", () => ({
  createTask: vi.fn(),
  getAllTasks: vi.fn(),
  updateTask: vi.fn(),
  //mock the delete function here
}));

import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../actions/actions.js";
import TodoForm from "./TodoForm";

describe("TodoForm", () => {
  beforeEach(() => {
    //resets all mocks before each test run
    vi.clearAllMocks();
    getAllTasks.mockResolvedValueOnce([]);
  });
  it("Should render submit form button", () => {
    render(<TodoForm />);
    expect(screen.getByText("create task")).toBeInTheDocument();
  });
  it("Should add and show a new task", async () => {
    const taskTitle = "testTask";
    const mockNewTask = { id: 1, name: taskTitle, isComplete: false };
    createTask.mockResolvedValueOnce(mockNewTask);
    render(<TodoForm />);
    const textInput = screen.getByPlaceholderText("type here");
    await userEvent.type(textInput, taskTitle);
    screen.getByText("create task").click();

    await waitFor(() =>
      expect(screen.getByText(taskTitle)).toBeInTheDocument()
    );
  });
  //it.only only runs this test
  it.only("Should update and show changed task", async () => {
    //first add task
    const taskTitle = "testTask";
    const mockNewTask = { id: 1, name: taskTitle, isComplete: false };
    createTask.mockResolvedValueOnce(mockNewTask);
    render(<TodoForm />);
    const textInputPlaceholder = screen.getByPlaceholderText("type here");
    await userEvent.type(textInputPlaceholder, taskTitle);
    screen.getByText("create task").click();
    await waitFor(() =>
      expect(screen.getByText(taskTitle)).toBeInTheDocument()
    );

    //test clicking edit
    screen.getByText("edit").click();
    await waitFor(() =>
      expect(screen.getByTestId("editForm")).toBeInTheDocument()
    );

    //test clicking cancel
    screen.getByText("cancel").click();
    await waitFor(() =>
      expect(screen.queryByTestId("editForm")).not.toBeInTheDocument()
    );

    //click edit again
    screen.debug();
    screen.getByText("edit").click();
    await waitFor(() =>
      expect(screen.getByTestId("editForm")).toBeInTheDocument()
    );
    //will print out current state of the dom
    screen.debug();

    //test updating item
    const textInput = "buy milk";
    const inputElement = screen.getByRole("textbox", { name: "Task Name" });
    await userEvent.clear(inputElement);
    const checkBoxElement = screen.getByRole("checkbox", {
      name: "Completed",
    });
    await userEvent.type(inputElement, textInput);
    //Click Completed checkbox
    userEvent.click(checkBoxElement);

    screen.debug();

    //click submit (edit) button and mock api call
    const editButton = screen.getByRole("button", { name: "edit" });
    console.log(editButton);
    //Clicked Completed a few lines earlier, so isComplete should now be true
    const mockUpdateTask = { id: 1, name: textInput, isComplete: true };

    //mockUpdateTask is the argument that should be passed to the UI
    expect(updateTask).toHaveBeenCalledExactlyOnceWith(mockUpdateTask);
    //assert that updateTask was called and that the api response looks like mockUpdateTask
    updateTask.mockResolvedValueOnce(mockUpdateTask);

    //verify item has been updated on screen
  });
});

//Work on update/delete unit tests
