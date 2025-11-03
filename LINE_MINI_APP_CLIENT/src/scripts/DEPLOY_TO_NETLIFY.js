import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";

const clientDir = process.cwd();
const sourceBuildDir = path.join(clientDir, "../BUILD_LINE_MINI_APP/build");

async function main() {
  try {
    if (!fs.existsSync(sourceBuildDir)) {
      throw new Error("❌ not found build folder!");
    }
    const preserve = ["package.json", "scripts"];
    const files = fs.readdirSync(clientDir);
    for (const file of files) {
      if (!preserve.includes(file)) {
        fs.removeSync(path.join(clientDir, file));
      }
    }
    fs.copySync(sourceBuildDir, clientDir, { overwrite: true });
    execSync("git add .", { cwd: clientDir, stdio: "inherit" });
    execSync('git commit -m "Deploy: Auto build from BUILD_LINE_MINI_APP"', {
      cwd: clientDir,
      stdio: "inherit",
    });
    execSync("git push", { cwd: clientDir, stdio: "inherit" });
  } catch (err) {
    console.error(err.message);
  }
}

main();
