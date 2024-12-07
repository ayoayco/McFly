import { describe, expect, test, vi } from "vitest";
import { exportedForTest } from "../commands/serve.mjs";
import consola from "consola";

describe("FUNCTION: serve()", () => {
  const testFn = exportedForTest.serve;
  const mocks = vi.hoisted(() => {
    return {
      execSync: vi.fn(),
    };
  });

  vi.mock("node:child_process", () => {
    return {
      execSync: mocks.execSync,
    };
  });

  test("execute nitropack serve", async () => {
    const command = `npx nitropack dev`;
    const param = { stdio: "inherit" };

    testFn();

    expect(mocks.execSync).toHaveBeenCalledWith(command, param);
  });

  test("catch error", () => {
    const spy = vi.spyOn(consola, "error");
    mocks.execSync.mockImplementationOnce(() => {
      throw new Error("hey");
    });

    testFn();

    expect(spy).toHaveBeenCalledWith(new Error("hey"));
  });
});

/**
 * TODO: test printInfo
 */
// describe("FUNCTION: printInfo()", () => {
//   const testFn = exportedForTest.printInfo;

//   test("log mcfly and nitro versions", () => {
//     const spy = vi.spyOn(consola, "log");

//     testFn();

//     expect(spy).toHaveBeenCalled();
//   });
// });
