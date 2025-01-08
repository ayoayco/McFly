import { expect, test, vi } from 'vitest'
import { exportedForTest } from '../cli/commands/generate.mjs'
import consola from 'consola'

const testFn = exportedForTest.generate

test('show box message in-progress', () => {
  const spy = vi.spyOn(consola, 'box')

  testFn()
  const arg = spy.mock.calls[0][0]

  expect(spy).toHaveBeenCalled()
  expect(arg).toContain('In-progress')
})
