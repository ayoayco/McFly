#!/usr/bin/env node

const { downloadTemplate } = require("giget");
const { consola } = require("consola");
const { execSync: exec } = require("node:child_process");
create();
async function create() {
  console.clear();
  let hasErrors = false;
  const directory =
    (await consola.prompt("Name your new vanilla web app:", {
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
      consola.start("Installing dependencies...");
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

    consola.box(`McFly app created: ${directory}`);
  }
  return 1;
}
