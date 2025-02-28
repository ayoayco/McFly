#!/usr/bin/env node

import { consola } from 'consola'
import { colorize } from 'consola/utils'
import { downloadTemplate } from 'giget'
import { spawnSync } from 'node:child_process'
import * as path from 'node:path'

const [, , directoryArg] = process.argv

type PromptAction = {
  prompt: string
  info?: string
  startMessage: string
  command: string
  subCommand: string
  error: string
}

/**
 * Create McFly App
 */
async function create() {
  const defaultDirectory = 'mcfly-app'
  consola.box(`Hello! Welcome to ${colorize('bold', 'McFly')}!`)
  let directory = directoryArg

  if (!directory) {
    directory =
      (await consola.prompt('Give your new project a name:', {
        placeholder: defaultDirectory,
      })) ?? defaultDirectory
  } else {
    consola.success(`Using ${directory} as name.`)
  }

  if (typeof directory !== 'string') {
    return
  }

  directory = getSafeDirectory(directory)
  const hasErrors = await downloadTemplateToDirectory(directory)

  if (!hasErrors) {
    const prompts: PromptAction[] = [
      {
        prompt: `Would you like to install the dependencies to ${colorize(
          'bold',
          directory
        )}?`,
        info: 'This might take some time depending on your connectivity.',
        startMessage: 'Installing dependencies using npm...',
        command: `npm`,
        subCommand: 'install',
        error: `Install dependencies later with ${colorize(
          'yellow',
          'npm install'
        )}`,
      },
      {
        prompt: 'Would you like to initialize your git repository?',
        startMessage: 'Initializing git repository...',
        command: `git`,
        subCommand: 'init',
        error: `Initialize git repository later with ${colorize(
          'yellow',
          'git init'
        )}`,
      },
    ]

    const intentions = await askPrompts(prompts, directory)
    if (!!intentions && intentions.length > 0)
      showResults(directory, intentions[0])
  }
}

/**
 * Returns string that is safe for commands
 * @param {string} directory
 * @returns string
 */
function getSafeDirectory(directory: string): string {
  const { platform } = process
  const locale = path[platform === `win32` ? `win32` : `posix`]
  const localePath = directory.split(path.sep).join(locale.sep)
  return path.normalize(localePath)
}

/**
 * Tries to download the template to the directory and returns a Promise whether the operation resulted to errors
 * @param {string} directory
 * @returns Promise<boolean> hasErrors
 */
async function downloadTemplateToDirectory(
  directory: string
): Promise<boolean> {
  let hasErrors = false

  try {
    consola.start(
      `Copying template to ${colorize('bold', getSafeDirectory(directory))}...`
    )
    await downloadTemplate('sourcehut:ayoayco/mcfly/templates/basic', {
      dir: directory,
    })
  } catch (ㆆ_ㆆ) {
    if (ㆆ_ㆆ instanceof Error) {
      consola.error(ㆆ_ㆆ.message)
    } else {
      consola.error(ㆆ_ㆆ)
    }
    consola.info('Try a different name.\n')
    hasErrors = true
  }

  return hasErrors
}

/**
 * Iterate over an array of prompts and ask for user intention
 * @param {Array<PromptAction>} prompts
 * @param {string} cwd
 * @returns Promise<Array<boolean> | undefined>
 */
async function askPrompts(
  prompts: PromptAction[],
  cwd: string
): Promise<boolean[] | undefined> {
  const results: boolean[] = []

  for (const p of prompts) {
    const userIntends = await consola.prompt(p.prompt, {
      type: 'confirm',
    })

    if (typeof userIntends !== 'boolean') {
      return
    }

    if (userIntends) {
      p.info && consola.info(p.info)
      consola.start(p.startMessage)
      try {
        spawnSync(p.command, [p.subCommand], {
          cwd,
          shell: true,
          timeout: 100_000,
          stdio: 'inherit',
        })
        consola.success('Done!')
      } catch (ㆆ_ㆆ) {
        if (ㆆ_ㆆ instanceof Error) {
          consola.error(ㆆ_ㆆ.message)
        } else {
          consola.error(ㆆ_ㆆ)
        }
        consola.info(p.error + '\n')
      }
    }
    results.push(userIntends)
  }

  return results
}

/**
 * Displays the success result string based on directory and choices
 * @param {string} directory
 * @param {boolean} installDeps
 */
function showResults(directory: string, installDeps: boolean) {
  let nextActions = [
    `Go to your project by running ${colorize('yellow', `cd ${directory}`)}`,
  ]

  if (!installDeps) {
    nextActions.push(
      `Install the dependencies with ${colorize('yellow', 'npm install')}`
    )
  }

  nextActions = nextActions.concat([
    `Start the dev server with ${colorize('yellow', 'npm start')}`,
    `Join us at ${colorize('blue', 'https://ayco.io/sh/mcfly')}`,
  ])

  const result = `🎉 Your new ${colorize(
    'bold',
    'McFly'
  )} app is ready: ${directory}\n\nNext actions: ${nextActions
    .map((action, index) => `\n${++index}. ${action}`)
    .join('')}`

  consola.box(result)
}

create()
