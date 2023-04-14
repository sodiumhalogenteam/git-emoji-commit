import { $, execa } from "execa";
import os from "os";
import fs from "fs";
import path from "path";

// project-root/dist/cli.js
const cliPath = path.join(__dirname, "..", "..", "dist", "cli.js");

// async function setupTempGitRepo() {
//   const tempDir = await fs.promises.mkdtemp(
//     path.join(os.tmpdir(), "git-emoji-commit-test-")
//   );

//   await execa("git", ["init"], { cwd: tempDir });
//   await execa("git", ["config", "user.name", "Test User"], { cwd: tempDir });
//   await execa("git", ["config", "user.email", "test@example.com"], {
//     cwd: tempDir,
//   });

//   return tempDir;
// }

describe("CLI E2E tests", () => {
  it("cli.js should display a help message when run without arguments", async () => {
    const { stdout } = await $`node ${cliPath} --help`;
    expect(stdout).toMatch(/Usage:/);
  });

  it("cli.js should display the version number when run with --version or -V argument", async () => {
    const { stdout } = await $`node ${cliPath} --version`;
    expect(stdout).toMatch(/^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/);

    const { stdout: stdout2 } = await $`node ${cliPath} -V`;
    expect(stdout2).toMatch(/^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/);
  });

  //   it("should warn user there are no staged files", async () => {
  //     const tempRepoPath = await setupTempGitRepo();

  //     const { stdout } = await execa(cliPath, [], { cwd: tempRepoPath });
  //     expect(stdout).toMatch(/No staged files to commit/);
  //   });

  it("should show learn details", async () => {
    const { stdout } = await $`node ${cliPath} --learn`;
    expect(stdout).toMatch(/Learn more about/);
  });
});
