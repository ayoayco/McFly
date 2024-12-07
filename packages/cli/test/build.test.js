import consola from "consola";
import { vi, expect, test } from "vitest";
import { exportedForTest } from "../commands/build.mjs";

const testFn = exportedForTest.build;

const mocks = vi.hoisted(() => {
  return {
    execSync: vi.fn()
  }
})

vi.mock('node:child_process', () => {
  return {
    execSync: mocks.execSync
  }
})

test("start build with message", () => {
  const message = "Building project...";
  const spy = vi.spyOn(consola, "start");

  testFn();

  expect(spy).toHaveBeenCalledWith(message);
});

test("execute nitropack build", () => {
  const command = "npx nitropack build";
  const param = { stdio: "inherit" };

  testFn();

  expect(mocks.execSync).toHaveBeenCalledWith(command, param);
});

/**
 * TODO
 * - test catch error
 */
// test("catch error", () => {
//   const spy = vi.spyOn(consola, "error");
//   mocks.execSync.mockImplementation(() => new Error('hey'))

//   testFn();

//   expect(spy).toHaveBeenCalled();
// });
