import { expect, it, vi } from 'vitest'
import { exportedForTest } from '../src/cli/commands/generate.js'
import consola from 'consola'

const generate = exportedForTest.generate

it('show box message in-progress', () => {
  const spy = vi.spyOn(consola, 'box')

  generate()
  const arg = spy.mock.calls[0][0]

  expect(spy).toHaveBeenCalled()
  expect(arg).toContain('In-progress')
})
