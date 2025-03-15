import type { ParsedArgs } from 'citty'
import consola from 'consola'
import { expect, it, vi } from 'vitest'
import { exportedForTest } from './build.js'

const build = exportedForTest.build

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

it('start build with message', () => {
  const message = 'Building project...'
  const spy = vi.spyOn(consola, 'start')

  build({ dir: 'fakeDir', _: [] } as ParsedArgs)

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
