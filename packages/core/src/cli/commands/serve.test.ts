import consola from 'consola'
import { describe, expect, it, vi } from 'vitest'
import { exportedForTest } from './serve.js'

// describe.skip('FUNCTION: serve()', () => {
//   // // const testFn = exportedForTest.serve
//   // const mocks = vi.hoisted(() => {
//   //   return {
//   //     execSync: vi.fn(),
//   //   }
//   // })
//   // vi.mock('node:child_process', () => {
//   //   return {
//   //     execSync: mocks.execSync,
//   //   }
//   // })
//   // test('execute nitropack serve', async () => {
//   //   const command = `npx nitropack dev`
//   //   const param = { stdio: 'inherit' }
//   //   testFn()
//   //   expect(mocks.execSync).toHaveBeenCalledWith(command, param)
//   // })
//   // test('catch error', () => {
//   //   const spy = vi.spyOn(consola, 'error')
//   //   mocks.execSync.mockImplementationOnce(() => {
//   //     throw new Error('hey')
//   //   })
//   //   testFn()
//   //   expect(spy).toHaveBeenCalledWith(new Error('hey'))
//   // })
// })

describe('fUNCTION: printInfo()', () => {
  const testFn = exportedForTest.printInfo

  const createRequireMocks = vi.hoisted(() => {
    return {
      createRequire: vi.fn(),
    }
  })

  vi.mock('node:module', () => {
    return {
      createRequire: createRequireMocks.createRequire,
    }
  })

  it('log mcfly and nitro versions', async () => {
    const spy = vi.spyOn(consola, 'log')
    createRequireMocks.createRequire.mockImplementationOnce(() => {
      return () => {
        return {
          version: '-1.0.0',
        }
      }
    })

    await testFn()

    expect(spy.mock.calls[0][0]).toContain('McFly')
    expect(spy.mock.calls[0][0]).toContain('Nitro')
  })

  it('catch error', async () => {
    createRequireMocks.createRequire.mockImplementationOnce(() => {
      throw new Error('error')
    })
    const spy = vi.spyOn(consola, 'error')

    await testFn()

    expect(spy).toHaveBeenCalledWith(new Error('error'))
  })
})
