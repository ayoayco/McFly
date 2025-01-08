import { test, expect, vi } from 'vitest'
import { exportedForTest } from '../commands/prepare.mjs'
import consola from 'consola'
import { execSync } from 'node:child_process'

const testFn = exportedForTest.prepare

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

test('start prepare script', () => {
  const spy = vi.spyOn(consola, 'start')

  testFn()

  expect(spy).toHaveBeenCalled()
})

test.skip('execute nitropack prepare', () => {
  const successSpy = vi.spyOn(consola, 'success')
  const command = 'npx nitropack prepare'
  const param = { stdio: 'inherit' }

  testFn()

  expect(execSync).toHaveBeenCalledWith(command, param)
  expect(successSpy).toHaveBeenCalled()
})

test('catch error', () => {
  const errSpy = vi.spyOn(consola, 'error')
  const failSpy = vi.spyOn(consola, 'fail')
  mocks.execSync.mockImplementationOnce(() => {
    throw new Error()
  })

  testFn()

  expect(errSpy).toHaveBeenCalled()
  expect(failSpy).toHaveBeenCalled()
})
