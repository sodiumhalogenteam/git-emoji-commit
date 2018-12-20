#!/usr/bin/env node

const program = require("commander");
const { exec } = require("child_process");
const inquirer = require("inquirer");
var pjson = require("./package.json");

program
  .version(pjson.version)
  .option("-b, --bug", "squash bugs")
  .option("-d, --doc", "add/edit documentation & content")
  .option("-i, --improve", "refactor or rework")
  .option("-n, --new", "add new feature")
  .option("-s, --style", "edit/add styles")
  .option("-t, --test", "add/edit test")
  .option("-r, --try", "add untested to production")
  .parse(process.argv);

var questions = [
  {
    type: "list",
    name: "commitType",
    message: "Select a commit message type:",
    choices: [
      "🐛  BUG: fix/squash bug",
      "📖  DOC: documentation",
      "⚡  IMPROVE: refactoring",
      "📦  NEW: addition",
      "💅  STYLE: layout or style change",
      "✅  TEST: add/edit tests",
      "🤞  TRY: add untested to production"
    ],
    when: function(answers) {
      return answers.comments !== "Nope, all good!";
    }
  }
];

// check users global version
const checkVersion = () => {
  // only check major and minor versioning
  exec("npm show git-emoji-commit version", function(err, stdout, stderr) {
    if (
      pjson.version.trim().slice(0, -1) !=
      stdout
        .trim()
        .toString("utf8")
        .slice(0, -1)
    )
      console.log(
        `\x1b[32m`, // green
        `😎  Update available: ${stdout}`,
        "\x1b[37m", // white
        `run $ npm update i -g git-emoji-commit`
      );
  });
};

const makeCommit = command => {
  exec(command, function(err, stdout, stderr) {
    if (err) {
      console.log(
        'Git-Emoji-Commit couldn\'t execute the "git commit -m" command. 🤕'
      );
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`Console: ${stdout.toString("utf8")}`);
    console.log(`stderr: ${stderr.toString("utf8")}`);
    checkVersion();
  });
};

// TODO: need to check for commitType without a program.args - Chance

if (program.style) {
  makeCommit(`git commit -m "💅  STYLE: ${program.args}"`);
} else if (program.bug) {
  makeCommit(`git commit -m "🐛  BUG: ${program.args}"`);
} else if (program.doc) {
  makeCommit(`git commit -m "📖  DOC: ${program.args}"`);
} else if (program.improve) {
  makeCommit(`git commit -m "⚡  IMPROVE: ${program.args}"`);
} else if (program.new) {
  makeCommit(`git commit -m "📦  NEW: ${program.args}"`);
} else if (program.test) {
  makeCommit(`git commit -m "✅  TEST: ${program.args}"`);
} else if (program.try) {
  makeCommit(`git commit -m "🤞  TRY: ${program.args}"`);
} else {
  // if no cli args
  console.log("Pick a commit type. See more: gc --help");
  inquirer.prompt(questions).then(answers => {
    let commitType = JSON.stringify(answers.commitType, null, "  ");
    let commitTypeCleaned = commitType.replace(/\:(.*)/, "").replace(/"/, "");

    // check for commit message
    if (!program.args[0] || !program.args.length || !program.args) {
      // TODO: refactor to prevent having more than one inquirer in another inquirer - Chance
      inquirer
        .prompt({
          type: "input",
          name: "commitMessage",
          message: "What's your commit title/message?",
          validate: function(value) {
            if (value !== "") {
              return true;
            }
            console.log("😕  Please enter a valid commit message.");
            return 0;
          }
        })
        .then(answers => {
          makeCommit(
            `git commit -m "${commitTypeCleaned}: ${answers.commitMessage}"`
          );
        });
    }

    if (program.args[0]) {
      makeCommit(`git commit -m "${commitTypeCleaned}: ${program.args}"`);
    }
  });
}
