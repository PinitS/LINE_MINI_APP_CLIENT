const fs = require("fs");
const path = require("path");

const rootPath = process.cwd();
const jsconfigPath = path.resolve(rootPath, "jsconfig.json");
const outputPath = path.resolve(rootPath, "config-overrides.js");

if (!fs.existsSync(jsconfigPath)) {
  console.error("❌ jsconfig.json NOT FOUND");
  process.exit(1);
}

const jsconfig = JSON.parse(fs.readFileSync(jsconfigPath, "utf-8"));
const paths = jsconfig.compilerOptions?.paths || {};

const aliasEntries = Object.entries(paths)
  .map(([key, value]) => {
    const aliasKey = key.replace("/*", "");
    const aliasPath = value[0].replace(/^\.\/src\//, "src/").replace("/*", "");
    return `    "${aliasKey}": "${aliasPath}"`;
  })
  .join(",\n");

const output = `const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
${aliasEntries}
  })(config);

  return config;
};
`;

fs.writeFileSync(outputPath, output);
console.log("✅ GENERATE_CONFIG_OVERRIDES SUCCESS");
