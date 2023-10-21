#!/usr/bin/env node

const { downloadTemplate } = require("giget");
create();
async function create() {
  const { source, dir } = await downloadTemplate(
    "github:ayoayco/mcfly/templates/basic",
    {
      dir: "mcfly-app",
    }
  );
  console.log(`✨ New McFly app created: ${dir}`);
  return 1;
}
