import { test } from "vitest";
import { exportedForTest } from "..";
import { expect } from "vitest";

const testObj = exportedForTest.main;

test("should have correct subcommands", () => {
  Object.keys(testObj.subCommands).forEach((key) => {
    expect(testObj.subCommands[key]).toBeTypeOf("function");
    expect(testObj.subCommands[key].name).toBe(key);
  });
});
