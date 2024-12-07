import { test } from "vitest";
import { exportedForTest } from "../commands/prepare.mjs";
import { vi } from "vitest";
import consola from "consola";
import { expect } from "vitest";
import {execSync} from "node:child_process";

const testFn = exportedForTest.prepare;

test('start prepare script', () => {
  const spy = vi.spyOn(consola, 'start');

  testFn();

  expect(spy).toHaveBeenCalled()
})

test('execute nitropack prepare', () => {
  const command = 'npx nitropack prepare';
  const param = {stdio: 'inherit'};
  vi.mock('node:child_process');

  testFn();

  expect(execSync).toHaveBeenCalled();
})

/**
 * TODO:
 * - add test for catch error
 */