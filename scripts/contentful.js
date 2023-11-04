require("dotenv").config({ path: `./.env.local` });
const { exec } = require("node:child_process");
const command = exec(
  `yarn cf-content-types-generator -o contentful -s ${process.env.CONTENTFUL_SPACE_ID} -t ${process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN} -e ${process.env.CONTENTFUL_ENVIRONMENT}`
);

command.stdout.on("data", (data) => console.log(data));
command.stderr.on("data", (data) => console.log(data));
