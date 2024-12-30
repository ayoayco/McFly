import consola from 'consola'
import { vi, expect, test } from 'vitest'
import { exportedForTest } from '../commands/build.mjs'

const testFn = exportedForTest.build

const mocks = vi.hoisted(() => {
  return {
    build: vi.fn(),
  }
})

vi.mock('nitropack', () => {
  return {
    build: mocks.build,
  }
})

test('start build with message', () => {
  const message = 'Building project...'
  const spy = vi.spyOn(consola, 'start')

  testFn()

  expect(spy).toHaveBeenCalledWith(message)
})

// test('execute nitropack build', () => {
//   mocks.build.mockImplementation(() => {})
//   testFn({ dir: '.' })

//   expect(mocks.build).toHaveBeenCalled()
// })

// test('catch error', () => {
//   const spy = vi.spyOn(consola, 'error')
//   mocks.build.mockImplementationOnce(() => {
//     throw new Error('hey')
//   })

//   testFn()

//   expect(spy).toHaveBeenCalledWith(new Error('hey'))
// })
