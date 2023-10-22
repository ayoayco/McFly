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
      let done = false;
      setTimeout(() => {
        if (!done)
          consola.info(
            "This may take some time depending on your connectivity..."
          );
      }, 3000);
      try {
        await exec(`npm --prefix ${directory} install`);
        done = true;
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

    consola.box(`🎉 Your new McFly app is now ready: ./${directory}\n
Next actions:
1. Go to your project by running 'cd ./${directory}'
2. Run 'npm start' to start the dev server
3. Join us at https://ayco.io/gh/McFly`);
  }

  return 1;
}
