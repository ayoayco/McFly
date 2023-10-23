#!/usr/bin/env node

const { downloadTemplate } = require("giget");
const { consola } = require("consola");
const { execSync: exec } = require("node:child_process");
const { colorize } = require("consola/utils");
create();
async function create() {
  console.clear();
  let hasErrors = false;
  const defaultDirectory = "./mcfly-app";
  consola.box(`👋 Hello! Welcome to ${colorize("bold", "McFly")}!`);
  const directory =
    (await consola.prompt("Give your new project a name:", {
      placeholder: defaultDirectory,
    })) ?? defaultDirectory;
  try {
    consola.start(`Copying template to ${directory}...`);
    await downloadTemplate("github:ayoayco/mcfly/templates/basic", {
      dir: directory,
    });
  } catch (e) {
    consola.error(e);
    hasErrors = true;
  }

  if (!hasErrors) {
    const installDeps = await consola.prompt(
      "Would you like to install the dependencies?",
      {
        type: "confirm",
      }
    );
    if (installDeps) {
      consola.info("This might take some time depending on your connectivity.");
      consola.start("Installing dependencies using npm...");
      try {
        await exec(`npm --prefix ${directory} install`);
        consola.success("Done!");
      } catch (e) {
        consola.error(e);
      }
    }

    const initializeGit = await consola.prompt(
      "Would you like to initialize your git repository?",
      {
        type: "confirm",
      }
    );
    if (initializeGit) {
      consola.start("Initializing git repository...");
      try {
        await exec(`git -C ${directory} init`);
        consola.success("Done!");
      } catch (e) {
        consola.error(e);
      }
    }

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
  return 1;
}
