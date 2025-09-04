import { getAllTasks } from "../actions";
import { vi, describe, it } from "vitest";

global.fetch = vi.fn();
describe("getAllTasks", () => {
  it("returnArrayOfTasks", async () => {
    const mockResonse = [{ id: 1, name: "test", isComplete: false }];
    fetch.mockResolvedValue(mockResonse);
    const result = await getAllTasks();
    console.log(result);
  });
});
