#!/usr/bin/env node

import { consola } from "consola";
import { colorize } from "consola/utils";
import { downloadTemplate } from "giget";
import { execSync as exec } from "node:child_process";

const [, , directoryArg] = process.argv;

/**
 * @typedef {{
 *  prompt: string,
 *  info?: string,
 *  startMessage: string,
 *  command: string,
 * }} PromptAction
 **/

/**
 * Create McFly App
 */
async function create() {
  console.clear();
  const defaultDirectory = "mcfly-app";
  consola.box(`Hello! Welcome to ${colorize("bold", "McFly")}!`);
  let directory = directoryArg;

  if (!directory) {
    directory =
      (await consola.prompt("Give your new project a name:", {
        placeholder: defaultDirectory,
      })) ?? defaultDirectory;
  } else {
    consola.success(`Using ${directory} as name.`);
  }

  const hasErrors = await downloadTemplateToDirectory(directory);
  const safeDirectory = getSafeDirectory(directory);

  if (!hasErrors) {
    /**
     * @type Array<PromptAction>
     */
    const prompts = [
      {
        prompt: `Would you like to install the dependencies to ${safeDirectory}?`,
        info: "This might take some time depending on your connectivity.",
        startMessage: "Installing dependencies using npm...",
        command: `npm --prefix ${safeDirectory} install`,
      },
      {
        prompt: "Would you like to initialize your git repository?",
        startMessage: "Initializing git repository...",
        command: `git -C ${safeDirectory} init`,
      },
    ];

    const intentions = await askPrompts(prompts);
    showResults(safeDirectory, intentions[0]);
  }
}

/**
 * Returns string that is safe for commands
 * @param {string} directory
 * @returns string
 */
function getSafeDirectory(directory) {
  
  const dir =  /\s/.test(directory) ? `"${directory}"` : directory;
  console.log('>>>', dir)
  return dir;
}

/**
 * Tries to download the template to the directory and returns a Promise whether the operation resulted to errors
 * @param {string} directory
 * @returns Promise<boolean> hasErrors
 */
async function downloadTemplateToDirectory(directory) {
  let hasErrors = false;

  try {
    consola.start(
      `Copying template to ${colorize("bold", getSafeDirectory(directory))}...`
    );
    await downloadTemplate("github:ayoayco/mcfly/templates/basic", {
      dir: directory,
    });
  } catch (e) {
    consola.error(e);
    hasErrors = true;
  }

  return hasErrors;
}

/**
 *
 * @param {Array<PromptAction>} prompts
 * @returns Array<boolean>
 */
async function askPrompts(prompts) {
  const results = [];

  for (const p of prompts) {
    const userIntends = await consola.prompt(p.prompt, {
      type: "confirm",
    });

    if (userIntends) {
      p.info && consola.info(p.info);
      consola.start(p.startMessage);
      try {
        console.log('>>>', p.command)
        await exec(p.command, { stdio: "inherit" });
        consola.success("Done!");
      } catch (e) {
        consola.error(e);
      }
    }
    results.push(userIntends);
  }

  return results;
}

/**
 * Displays the success result string based on directory and choices
 * @param {string} directory
 * @param {boolean} installDeps
 */
function showResults(directory, installDeps) {
  let nextActions = [
    `Go to your project by running ${colorize("yellow", `cd ${directory}`)}`,
  ];

  if (!installDeps) {
    nextActions.push(
      `Install the dependencies with ${colorize("yellow", "npm install")}`
    );
  }

  nextActions = nextActions.concat([
    `Start the dev server with ${colorize("yellow", "npm start")}`,
    `Join us at ${colorize("blue", "https://ayco.io/gh/McFly")}`,
  ]);

  const result = `🎉 Your new ${colorize(
    "bold",
    "McFly"
  )} app is ready: ${directory}\n\nNext actions: ${nextActions
    .map((action, index) => `\n${++index}. ${action}`)
    .join("")}`;

  consola.box(result);
}

create();
