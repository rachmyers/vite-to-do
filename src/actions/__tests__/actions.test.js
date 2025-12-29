import { getAllTasks, createTask, updateTask, deleteTask } from "../actions";
import { vi, describe, it, expect, beforeEach } from "vitest";

//run using npm test
//getAllTasks test
global.fetch = vi.fn();
describe("getAllTasks", () => {
  //Resets mock function
  beforeEach(() => {
    fetch.mockClear();
  });
  it("Return array of tasks", async () => {
    //arrange
    const mockResponseData = [{ id: 1, name: "test", isComplete: false }];
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mockResponseData,
    };
    fetch.mockResolvedValue(mockResponse);
    //act
    const result = await getAllTasks();
    //assert
    expect(result).toBe(mockResponseData);
  });

  it("Should throw error if response not OK", async () => {
    //arrange
    const mockResponse = {
      ok: false,
      status: 500,
    };
    fetch.mockResolvedValue(mockResponse);
    //act
    //const result = await getAllTasks();
    //assert
    //console.log(result);
    await expect(getAllTasks()).rejects.toThrowError();
  });
});

//createTask test
describe("createTask", () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  it("Create a task", async () => {
    //arrange
    const mockNewTask = { id: 1, name: "test", isComplete: false };
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mockNewTask,
    };
    fetch.mockResolvedValue(mockResponse);
    //act
    const result = await createTask(mockNewTask);
    //assert
    expect(result).toBe(mockNewTask);
  });

  it("Should throw error if response not OK", async () => {
    //arrange
    const mockNewTask = { id: 1, name: "test", isComplete: false };
    const mockResponse = {
      ok: false,
      status: 500,
    };
    fetch.mockResolvedValue(mockResponse);
    await expect(createTask(mockNewTask)).rejects.toThrowError();
  });
});

//updateTask test
describe("updateTask", () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  it("Update a task", async () => {
    //arrange
    const mockTask = [{ id: 1, name: "test", isComplete: false }];
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mockTask,
    };
    fetch.mockResolvedValue(mockResponse);
    //act
    const result = await updateTask(mockTask);
    //assert
    expect(result).toBe(mockTask);
  });

  it("Should throw error if response not OK", async () => {
    //arrange
    const mockTask = [{ id: 1, name: "test", isComplete: false }];
    const mockResponse = {
      ok: false,
      status: 500,
    };
    fetch.mockResolvedValue(mockResponse);
    await expect(updateTask(mockTask)).rejects.toThrowError();
  });
});
