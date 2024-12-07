import { expect, test, vi } from "vitest";
import { exportedForTest } from "../commands/new.mjs";
import { execSync } from "node:child_process";

const testFn = exportedForTest.createNew;

test("execute create mcfly", () => {
  const command = `npm create mcfly@latest`
  const param = {stdio: 'inherit'}
  vi.mock('node:child_process');

  testFn({dir: undefined})

  expect(execSync).toHaveBeenCalledWith(command, param)
})

test("execute create mcfly with no dir", () => {
  const dir = 'fake-dir'
  const command = `npm create mcfly@latest ${dir}`
  const param = {stdio: 'inherit'}
  vi.mock('node:child_process');

  testFn({dir: undefined})

  expect(execSync).not.toHaveBeenCalledWith(command, param)
})

test("execute create mcfly with dir", () => {
  const dir = 'fake-dir'
  const command = `npm create mcfly@latest ${dir}`
  const param = {stdio: 'inherit'}
  vi.mock('node:child_process');

  testFn({dir})

  expect(execSync).toHaveBeenCalledWith(command,param)
})

test("execute create mcfly with _dir", () => {
  const dir = 'fake-dir'
  const command = `npm create mcfly@latest ${dir}`
  const param = {stdio: 'inherit'}
  vi.mock('node:child_process');

  testFn({_dir: dir})

  expect(execSync).toHaveBeenCalledWith(command,param)
})

test("execute create mcfly with dir preferred over _dir", () => {
  const dir = 'preferred-dir'
  const command = `npm create mcfly@latest ${dir}`
  const param = {stdio: 'inherit'}
  vi.mock('node:child_process');

  testFn({dir: dir, _dir: 'not-preferred'})

  expect(execSync).toHaveBeenCalledWith(command,param)
})