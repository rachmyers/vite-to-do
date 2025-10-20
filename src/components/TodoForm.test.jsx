import TodoForm from "./TodoForm";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("TodoForm", () => {
  it("Should render submit form button", () => {
    render(<TodoForm />);
    expect(screen.getByText("create task")).toBeInTheDocument();
  });
  it("Should add and show a new task", () => {
    render(<TodoForm />);
    const textInput = screen.getAllByPlaceholderText("type here");
    userEvent.type(textInput, "new task");
    screen.getByText("create task").click();
    //expect(screen.getByText("create task")).toBeInTheDocument();
  });
});
