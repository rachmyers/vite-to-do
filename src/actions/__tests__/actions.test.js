import { getAllTasks, createTask } from "../actions";
import { vi, describe, it, expect } from "vitest";

//run using npm test
//getAllTasks test
global.fetch = vi.fn();
describe("getAllTasks", () => {
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
global.fetch = vi.fn();
describe("createTask", () => {
  it("Create a task", async () => {
    //arrange
    const mockNewTask = [{ id: 1, name: "test", isComplete: false }];
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
    const mockNewTask = [{ id: 1, name: "test", isComplete: false }];
    const mockResponse = {
      ok: false,
      status: 500,
    };
    fetch.mockResolvedValue(mockResponse);
    //act
    //const result = await getAllTasks();
    //assert
    //console.log(result);
    await expect(createTask(mockNewTask)).rejects.toThrowError();
  });
});
