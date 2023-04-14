import { $ } from "execa";
import path from "path";

// project-root/dist/cli.js
const cliPath = path.join(__dirname, "..", "..", "dist", "cli.js");

describe("CLI E2E tests", () => {
  test("cli.js should display a help message when run without arguments", async () => {
    const { stdout } = await $`node ${cliPath} --help`;
    expect(stdout).toMatch(/Usage:/);
  });

  test("cli.js should display the version number when run with --version or -V argument", async () => {
    const { stdout } = await $`node ${cliPath} --version`;
    expect(stdout).toMatch(/^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/);

    const { stdout: stdout2 } = await $`node ${cliPath} -V`;
    expect(stdout2).toMatch(/^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/);
  });

  // Add more test cases...
});
