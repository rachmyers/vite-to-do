import TodoForm from "./TodoForm";
import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { createTask, getAllTasks } from "../actions/actions.js";

//ues mocked actions and functions and not real ones
//arrow function brackets wrapped in () to do implicit return
vi.mock("../actions/actions.js", () => ({
  createTask: vi.fn(),
  getAllTasks: vi.fn(),
}));

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
    const mockResponseData = [{ id: 1, name: "testTask", isComplete: false }];
    createTask.mockResolvedValueOnce(mockResponseData);
    render(<TodoForm />);
    const textInput = screen.getAllByPlaceholderText("type here");
    userEvent.type(textInput, "new task");
    screen.getByText("create task").click();

    await waitFor(expect(screen.getByText("testTask")).toBeInTheDocument());
  });
});
