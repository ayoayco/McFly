import type { ParsedArgs } from 'citty'
import consola from 'consola'
import { expect, it, vi } from 'vitest'
import { exportedForTest } from '../src/cli/commands/build.js'

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

// TODO
it.skip('execute nitropack build', () => {
  mocks.build.mockImplementation(() => {})
  build({ dir: '.', _: [] })

  expect(mocks.build).toHaveBeenCalled()
})

// TODO
it.skip('catch error', () => {
  const spy = vi.spyOn(consola, 'error')
  mocks.build.mockImplementationOnce(() => {
    throw new Error('hey')
  })

  build({ _: [] })

  expect(spy).toHaveBeenCalledWith(new Error('hey'))
})
