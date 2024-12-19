import { expect, test, vi } from 'vitest'
import { exportedForTest } from '../commands/new.mjs'
import { execSync } from 'node:child_process'
import consola from 'consola'

const testFn = exportedForTest.createNew
const baseCommand = `npm create mcfly@latest`

const mocks = vi.hoisted(() => {
  return {
    execSync: vi.fn(),
  }
})

vi.mock('node:child_process', () => {
  return {
    execSync: mocks.execSync,
  }
})

test('execute create mcfly', () => {
  const param = { stdio: 'inherit' }

  testFn({ dir: undefined })

  expect(execSync).toHaveBeenCalledWith(baseCommand, param)
})

test('execute create mcfly with no dir', () => {
  const dir = 'fake-dir'
  const command = `${baseCommand} ${dir}`
  const param = { stdio: 'inherit' }

  testFn({ dir: undefined })

  expect(execSync).not.toHaveBeenCalledWith(command, param)
})

test('execute create mcfly with dir', () => {
  const dir = 'fake-dir'
  const command = `${baseCommand} ${dir}`
  const param = { stdio: 'inherit' }

  testFn({ dir })

  expect(execSync).toHaveBeenCalledWith(command, param)
})

test('execute create mcfly with _dir', () => {
  const dir = 'fake-dir'
  const command = `${baseCommand} ${dir}`
  const param = { stdio: 'inherit' }

  testFn({ _dir: dir })

  expect(execSync).toHaveBeenCalledWith(command, param)
})

test('execute create mcfly with dir preferred over _dir', () => {
  const dir = 'preferred-dir'
  const command = `${baseCommand} ${dir}`
  const param = { stdio: 'inherit' }

  testFn({ dir: dir, _dir: 'not-preferred' })

  expect(execSync).toHaveBeenCalledWith(command, param)
})

test('catch error', () => {
  const dir = 'fake-dir'
  const spy = vi.spyOn(consola, 'error')
  mocks.execSync.mockImplementationOnce(() => {
    throw new Error('hey')
  })

  testFn({ dir })

  expect(spy).toHaveBeenCalledWith(new Error('hey'))
})
