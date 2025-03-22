import { execSync } from 'node:child_process'
import { consola } from 'consola'
import { expect, vi } from 'vitest'
import { exportedForTest } from '../src/cli/commands/new.js'
import { it } from 'node:test'

const createNew = exportedForTest.createNew
const baseCommand = `npm create mcfly@latest`

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

it('execute create mcfly', () => {
  const param = { stdio: 'inherit' }

  createNew({ _: [] })

  expect(execSync).toHaveBeenCalledWith(baseCommand, param)
})

it('execute create mcfly with no dir', () => {
  const dir = 'fake-dir'
  const command = `${baseCommand} ${dir}`
  const param = { stdio: 'inherit' }

  createNew({ _: [] })

  expect(execSync).not.toHaveBeenCalledWith(command, param)
})

it('execute create mcfly with dir', () => {
  const dir = 'fake-dir'
  const command = `${baseCommand} ${dir}`
  const param = { stdio: 'inherit' }

  createNew({ dir, _: [] })

  expect(execSync).toHaveBeenCalledWith(command, param)
})

it('execute create mcfly with _dir', () => {
  const dir = 'fake-dir'
  const command = `${baseCommand} ${dir}`
  const param = { stdio: 'inherit' }

  createNew({ _dir: dir, _: [] })

  expect(execSync).toHaveBeenCalledWith(command, param)
})

it('execute create mcfly with dir preferred over _dir', () => {
  const dir = 'preferred-dir'
  const command = `${baseCommand} ${dir}`
  const param = { stdio: 'inherit' }

  createNew({ dir, _dir: 'not-preferred', _: [] })

  expect(execSync).toHaveBeenCalledWith(command, param)
})

it('catch error', () => {
  const dir = 'fake-dir'
  const spy = vi.spyOn(consola, 'error')
  mocks.execSync.mockImplementationOnce(() => {
    throw new Error('hey')
  })

  createNew({ dir, _: [] })

  expect(spy).toHaveBeenCalledWith(new Error('hey'))
})
