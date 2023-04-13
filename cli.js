#!/usr/bin/env node

const program = require("commander");
const { exec } = require("child_process");
const inquirer = require("inquirer");
var pjson = require("./package.json");

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

var questions = [
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

// check users global version
const checkVersion = () => {
  // only check major and minor versioning
  exec("npm show git-emoji-commit version", function (err, stdout, stderr) {
    const latestVersion = stdout.trim().toString("utf8");
    const currentVersion = pjson.version.trim().slice(0, -1);
    if (currentVersion != latestVersion.slice(0, -1))
      console.log(
        `\x1b[32m`, // green
        `😎  Update available: ${latestVersion}`,
        "\x1b[37m", // white
        `run $ npm update -g git-emoji-commit`
      );
  });
};

const makeCommit = (command) => {
  exec(command, function (err, stdout, stderr) {
    if (err) {
      console.log(
        // 'Git-Emoji-Commit couldn\'t execute the "git commit -m" command. 🤕\n',
        err
      );
      return;
    }

    // the *entire* stdout and stderr (buffered)
    if (stdout.length > 0) console.log(`[] ${stdout.toString("utf8")}`);
    if (stderr.length > 0) console.log(`{} ${stderr.toString("utf8")}`);
    checkVersion();
  });
};

// TODO: need to check for commitType without a program.args - Chance

const commitTypes = {
  feat: '📦  FEAT',
  style: '💅  STYLE',
  fix: '🐛  FIX',
  chore: '🧹  CHORE',
  doc: '📖  DOC',
  refactor: '⚡  REFACTOR',
  test: '✅  TEST',
  try: '🤞  TRY',
  build: '🚀  BUILD'
};

// if no cli args
const noMatchingCommitType = !Object.values(commitTypes).includes(program.args[0])
if (noMatchingCommitType) {
  console.log("Pick a commit type. See more: gc --help");
  inquirer.prompt(questions).then((answers) => {
    let commitType = JSON.stringify(answers.commitType, null, "  ");
    let commitTypeCleaned = commitType.replace(/\:(.*)/, "").replace(/"/, "");

    // check for commit message
    const noArgs = !program.args[0] || !program.args.length
    if (noArgs) {
      // TODO: refactor to prevent having nested inquirer - Chance Smith 4/11/2023
      inquirer
        .prompt({
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
        })
        .then((answers) => {
          makeCommit(
            `git commit -m "${commitTypeCleaned}: ${answers.commitMessage}"`
          );
        });
    }
   
    if (program.args[0]) {
      makeCommit(`git commit -m "${commitTypeCleaned}: ${program.args}"`);
    }
  });
} else {
  makeCommit(`git commit -m "${program.args}"`);
}