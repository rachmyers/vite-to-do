import TodoForm from "./TodoForm";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";

describe("TodoForm", () => {
  it("Should render submit form button", () => {
    render(<TodoForm />);
    expect(screen.getByText("create task")).toBeInTheDocument();
  });
});
