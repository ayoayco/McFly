#!/usr/bin/env node

const { downloadTemplate } = require("giget");
create();
async function create() {
  try {
    const { source, dir } = await downloadTemplate(
      "github:ayoayco/mcfly/templates/basic",
      {
        dir: "mcfly-app",
      }
    );
    console.log(`✨ New McFly app created: ${dir}`);
  } catch (e) {
    console.error('😱 "mcfly-app" directory already exists');
  }
  return 1;
}
