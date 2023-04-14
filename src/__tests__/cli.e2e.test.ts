import { $ } from "execa";
import path from "path";

// project-root/dist/cli.js
const cliPath = path.join(__dirname, "..", "..", "dist", "cli.js");

describe("CLI E2E tests", () => {
  test("cli.js should display a help message when run without arguments", async () => {
    const { stdout } = await $`node ${cliPath} --help`;
    expect(stdout).toMatch(/Usage:/);
  });

  //   test("cli.js should display the version number when run with --version argument", async () => {
  //     const { stdout } = await execa.node(cliPath, ["--version"]);
  //     expect(stdout).toMatch(/^\d+\.\d+\.\d+$/);
  //   });

  // Add more test cases...
});
