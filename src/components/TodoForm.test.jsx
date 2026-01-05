import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

// Mock the actions module BEFORE importing the component and functions
vi.mock("../actions/actions.js", () => ({
  createTask: vi.fn(),
  getAllTasks: vi.fn(),
  //mock the update and delete functions here
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
  it("Should update and show changed task", async () => {
    //first add task
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

    //test clicking edit
    screen.getByText("edit").click();
    await waitFor(() =>
      expect(screen.getByTestId("editForm")).toBeInTheDocument()
    );

    //test clicking cancel
    screen.getByText("cancel").click();
    await waitFor(() =>
      expect(screen.getByTestId("editForm")).not.toBeInTheDocument()
    );

    //click edit again
    // screen.getByText("edit").click();

    //test updating item

    //test clicking Completed

    //verify item has been updated on screen
  });
});

//Work on update/delete unit tests
