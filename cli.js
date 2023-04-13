#!/usr/bin/env node

const program = require("commander");
const { exec: Exec } = require("child_process");
const inquirer = require("inquirer");
var pjson = require("./package.json");

const commitTypes = {
  feat: "📦  FEAT",
  style: "💅  STYLE",
  fix: "🐛  FIX",
  chore: "🧹  CHORE",
  doc: "📖  DOC",
  refactor: "⚡  REFACTOR",
  test: "✅  TEST",
  try: "🤞  TRY",
  build: "🚀  BUILD",
};

var questions = [
  {
    type: "input",
    name: "commitMessage",
    message: "What's your commit title/message?",
    validate: function (value) {
      if (value !== "") {
        return true;
      }
      console.log("😕  Please enter a valid commit message.");
      return 0;
    },
    when: function (answers) {
      // there is no commit message
      return !program.args[0] || !program.args.length;
    },
  },
  {
    type: "list",
    name: "commitType",
    message: "Select a commit message type:",
    choices: [
      "📦  FEAT: new feature",
      "💅  STYLE: layout or style change",
      "🐛  FIX: fix/squash bug",
      "🧹  CHORE: update packages, gitignore etc; (no prod code)",
      "📖  DOC: documentation",
      "⚡  REFACTOR: refactoring",
      "📝  CONTENT: content changes",
      "✅  TEST: add/edit tests (no prod code)",
      "🤞  TRY: add untested to production",
      "🚀  BUILD: build for production",
    ],
    when: function (answers) {
      return answers.comments !== "Nope, all good!";
    },
  },
];

program
  .version(pjson.version)
  .option("-f, --feat", "add new feature")
  .option("-s, --style", "edit/add styles")
  .option("-x, --fix", "squash bugs")
  .option("-c, --chore", "add untested to production")
  .option("-d, --doc", "add/edit documentation & content")
  .option("-r, --refactor", "refactor or rework")
  .option("-t, --test", "add/edit test")
  .option("-y, --try", "add untested to production")
  .option("-b, --build", "build for production")
  .parse(process.argv);

const exec = (command) => {
  return new Promise((resolve, reject) => {
    Exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
};

async function checkVersion() {
  try {
    const { stdout } = await exec("npm show git-emoji-commit version");
    const latestVersion = stdout.trim().toString("utf8");
    const currentVersion = pjson.version.trim().slice(0, -1);
    if (currentVersion != latestVersion.slice(0, -1))
      console.log(
        "\x1b[32m", // green
        `😎  Update available: ${latestVersion}`,
        "\x1b[37m", // white
        `run $ npm update -g git-emoji-commit`
      );
  } catch (err) {
    console.error("Error checking for updates:", err);
  }
}

async function makeCommit(commitType, commitMessage) {
  try {
    const { stdout, stderr } = await exec(
      `git commit -m "${commitType}: ${commitMessage}"`
    );
    if (stdout.length > 0) console.log(`[] ${stdout.toString("utf8")}`);
    if (stderr.length > 0) console.log(`{} ${stderr.toString("utf8")}`);
    checkVersion();
  } catch (err) {
    console.error("Error executing git commit:", err);
  }
}

(async function main() {
  const commitMessage = program.args[0];

  if (!commitMessage) {
    const answers = await inquirer.prompt(questions);
    const commitType = answers.commitType
      .replace(/\:(.*)/, "")
      .replace(/"/, "");
    await makeCommit(commitType, answers.commitMessage);
  } else {
    const commitType = Object.values(commitTypes).find((type) =>
      commitMessage.startsWith(type)
    );

    if (!commitType) {
      console.log("Invalid commit type. See more: gc --help");
      const answers = await inquirer.prompt(questions);
      const selectedCommitType = answers.commitType
        .replace(/\:(.*)/, "")
        .replace(/"/, "");
      await makeCommit(selectedCommitType, commitMessage);
    } else {
      const message = commitMessage.slice(commitType.length + 1);
      await makeCommit(commitType, message);
    }
  }
})();
