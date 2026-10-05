import { getAllTasks, createTask, updateTask } from "../actions";
import type { TodosType } from "../../types/TodoType.js";
import { vi, describe, it, expect, beforeEach } from "vitest";

const fetchMock = vi.fn();
globalThis.fetch = fetchMock as typeof fetch;

describe("getAllTasks", () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it("Return array of tasks", async () => {
    const mockResponseData: TodosType[] = [
      { id: 1, name: "test", isComplete: false },
    ];
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mockResponseData,
    };

    fetchMock.mockResolvedValue(mockResponse);

    const result = await getAllTasks();

    expect(result).toEqual(mockResponseData);
  });

  it("Should throw error if response not OK", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
    };

    fetchMock.mockResolvedValue(mockResponse);

    await expect(getAllTasks()).rejects.toThrowError();
  });
});

describe("createTask", () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it("Create a task", async () => {
    const mockNewTask: TodosType = { id: 1, name: "test", isComplete: false };
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mockNewTask,
    };

    fetchMock.mockResolvedValue(mockResponse);

    const result = await createTask("test");

    expect(result).toEqual(mockNewTask);
  });

  it("Should throw error if response not OK", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
    };

    fetchMock.mockResolvedValue(mockResponse);

    await expect(createTask("test")).rejects.toThrowError();
  });
});

describe("updateTask", () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it("Update a task", async () => {
    const mockTask: TodosType = { id: 1, name: "test", isComplete: false };
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mockTask,
    };

    fetchMock.mockResolvedValue(mockResponse);

    const result = await updateTask(mockTask);

    expect(result).toEqual(mockTask);
  });

  it("Should throw error if response not OK", async () => {
    const mockTask: TodosType = { id: 1, name: "test", isComplete: false };
    const mockResponse = {
      ok: false,
      status: 500,
    };

    fetchMock.mockResolvedValue(mockResponse);

    await expect(updateTask(mockTask)).rejects.toThrowError();
  });
});
