import { consola } from 'consola'
import { it, expect, vi } from 'vitest'
import { exportedForTest } from './prepare.js'
const prepare = exportedForTest.prepare

const mocks = vi.hoisted(() => {
  return {
    createNitro: vi.fn(),
  }
})

vi.mock('nitropack', () => {
  return {
    createNitro: mocks.createNitro,
  }
})

it('start prepare script', () => {
  const spy = vi.spyOn(consola, 'start')

  prepare({ dir: 'fakeDir', _: [] })

  expect(spy).toHaveBeenCalled()
})

it.skip('execute nitropack prepare', () => {
  const successSpy = vi.spyOn(consola, 'success')

  prepare({ dir: 'fakeDir', _: [] })

  expect(successSpy).toHaveBeenCalled()
})

it.skip('catch error', () => {
  const dir = 'fake-dir'
  const errSpy = vi.spyOn(consola, 'error')
  mocks.createNitro.mockImplementationOnce(() => {
    throw new Error('create nitro err')
  })

  prepare({ dir, _: [] })

  expect(errSpy).toHaveBeenCalled()
})
