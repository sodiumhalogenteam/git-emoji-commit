#!/usr/bin/env node

const program = require("commander");
const { exec } = require("child_process");
const inquirer = require("inquirer");

program
  .version("1.1.1")
  .option("-s, --style", "edit/add styles")
  .option("-b, --bug", "squash bugs")
  .option("-i, --improve", "refactor or rework")
  .option("-r, --release", "release feature")
  .option("-n, --new", "add new feature")
  .option("-d, --doc", "add/edit documentation")
  .option("-t, --test", "add/edit test")
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
      "🚀  RELEASE: release feature",
      "💅  STYLE: layout or style change",
      "✅  TEST: add/edit tests"
    ],
    when: function(answers) {
      return answers.comments !== "Nope, all good!";
    }
  }
];

// TODO:
// need to check for commitType without a program.args - Chance

if (program.style) {
  let command = 'git commit -m "💅  STYLE: ' + program.args + '"';
  exec(command, function(err, stdout, stderr) {
    console.log(stdout.toString("utf8"));
  });
} else if (program.bug) {
  let command = 'git commit -m "🐛  BUG: ' + program.args + '"';
  exec(command, function(err, stdout, stderr) {
    console.log(stdout.toString("utf8"));
  });
} else if (program.improve) {
  let command = `git commit -m "⚡  IMPROVE: ${program.args}"`;
  console.log(command);
  exec(command, function(err, stdout, stderr) {
    console.log(stdout.toString("utf8"));
  });
} else if (program.release) {
  let command = `git commit -m "🚀  RELEASE: ${program.args}"`;
  exec(command, function(err, stdout, stderr) {
    console.log(stdout.toString("utf8"));
  });
} else if (program.new) {
  let command = `git commit -m "📦  NEW: ${program.args}"`;
  exec(command, function(err, stdout, stderr) {
    console.log(stdout.toString("utf8"));
  });
} else if (program.doc) {
  let command = `git commit -m "📖  DOC: ${program.args}"`;
  exec(command, function(err, stdout, stderr) {
    console.log(stdout.toString("utf8"));
  });
} else if (program.test) {
  let command = `git commit -m "✅  TEST: ${program.args}"`;
  exec(command, function(err, stdout, stderr) {
    console.log(stdout.toString("utf8"));
  });
} else {
  // if nothing
  console.log(
    "You must pick (ONLY) one commit emoji option. See options: gc --help"
  );
  inquirer.prompt(questions).then(answers => {
    let commitType = JSON.stringify(answers.commitType, null, "  ");
    let commitTypeCleaned = commitType.replace(/\:(.*)/, "").replace(/"/, "");

    // check for commit message
    if (!program.args[0] || !program.args.length || !program.args) {
      inquirer
        .prompt({
          type: "input",
          name: "commitMessage",
          message: "What's your commit title/message?",
          validate: function(value) {
            if (value !== "") {
              return true;
            }

            return "😕 Please enter a valid commit message.";
          }
        })
        .then(answers => {
          let command = `git commit -m "${commitTypeCleaned}: ${
            answers.commitMessage
          }"`;
          exec(command, function(err, stdout, stderr) {
            console.log(stdout.toString("utf8"));
          });
        });
    }

    if (program.args[0]) {
      let command = `git commit -m "${commitTypeCleaned}: ${program.args}"`;
      exec(command, function(err, stdout, stderr) {
        console.log(stdout.toString("utf8"));
      });
    }
  });
}
