#!/usr/bin/env node

const { downloadTemplate } = require("giget");
const { consola } = require("consola");
const { execSync: exec } = require("node:child_process");
create();
async function create() {
  console.clear();
  let hasErrors = false;
  consola.box("👋 Hello! Welcome to McFly.");
  const directory =
    (await consola.prompt("Give your new project a name:", {
      placeholder: "./mcfly-app",
    })) ?? "mcfly-app";
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

    let nextActions = [`Go to your project by running 'cd ./${directory}'`];

    if (!installDeps) {
      nextActions.push("Install the dependencies with: 'npm install'");
    }

    nextActions = nextActions.concat([
      "Run 'npm start' to start the dev server",
      "Join us at https://ayco.io/gh/McFly",
    ]);

    const result = `🎉 Your new McFly app is now ready: ./${directory}\n\nNext actions: ${nextActions
      .map((action, index) => `\n${++index}. ${action}`)
      .join("")}`;

    consola.box(result);
  }

  return 1;
}
