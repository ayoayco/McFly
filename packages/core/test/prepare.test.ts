import { consola } from 'consola'
import { it, expect, vi } from 'vitest'
import { exportedForTest } from '../src/commands/prepare'
const prepare = exportedForTest.prepare

const mocks = vi.hoisted(() => {
  return {
    createNitro: vi.fn(),
  }
})

it('start prepare script', () => {
  const spy = vi.spyOn(consola, 'start')

  prepare({ dir: 'fakeDir', _: [] })

  expect(spy).toHaveBeenCalled()
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
