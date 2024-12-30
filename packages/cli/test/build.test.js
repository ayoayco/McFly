import consola from 'consola'
import { vi, expect, test } from 'vitest'
import { exportedForTest } from '../commands/build.mjs'
import * as nitropack from 'nitropack'

const testFn = exportedForTest.build

const mocks = vi.hoisted(() => {
  return {
    execSync: vi.fn(),
    build: vi.fn(),
  }
})

vi.mock('node:child_process', () => {
  return {
    execSync: mocks.execSync,
  }
})

test('start build with message', () => {
  const message = 'Building project...'
  const spy = vi.spyOn(consola, 'start')

  testFn()

  expect(spy).toHaveBeenCalledWith(message)
})

test('execute nitropack build', () => {
  const spy = vi.spyOn(nitropack, 'build')

  testFn({ dir: '.' })

  expect(spy).toHaveBeenCalled()
})

test('catch error', () => {
  const spy = vi.spyOn(consola, 'error')
  mocks.build.mockImplementationOnce(() => {
    throw new Error('hey')
  })

  testFn()

  expect(spy).toHaveBeenCalledWith(new Error('hey'))
})
