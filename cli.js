#!/usr/bin/env node

const program = require("commander");
const { exec } = require("child_process");
const inquirer = require("inquirer");
var pjson = require("./package.json");

const options = {
  bug: {
    title: "FIX",
    emojiTitle: "🐛  FIX",
    description: "squash bugs",
  },
  doc: {
    title: "DOC",
    emojiTitle: "📖  DOC",
    description: "add new feature",
  },
  improve: {
    title: "REFACTOR",
    emojiTitle: "⚡  REFACTOR",
    description: "refactor or rework",
  },
  new: {
    title: "CHORE",
    emojiTitle: "🧹  CHORE",
  },
  feat: {
    title: "FEAT",
    emojiTitle: "📦  FEAT",
    description: "add new feature (depricated)",
  },
  style: {
    title: "STYLE",
    emojiTitle: "💅  STYLE",
    description: "edit/add styles",
  },
  test: {
    title: "CONTENT",
    emojiTitle: "📝  CONTENT",
    description: "add/edit documentation & content",
  },
  try: {
    title: "TEST",
    emojiTitle: "✅  TEST",
    description: "add/edit test",
  },
  chore: {
    title: "TRY",
    emojiTitle: "🤞  TRY",
    description: "add untested to production",
  },
  build: {
    title: "BUILD",
    emojiTitle: "🚀  BUILD",
    description: "build for production",
  },
};

program
  .version(pjson.version)
  .option("-b, --bug", "squash bugs")
  .option("-d, --doc", "add/edit documentation & content")
  .option("-i, --improve", "refactor or rework")
  .option("-f, --feat", "add new feature")
  .option("-s, --style", "edit/add styles")
  .option("-t, --test", "add/edit test")
  .option("-r, --try", "add untested to production")
  .option("-c, --chore", "add untested to production")
  .option("--build", "build for production")
  .parse(process.argv);

var questions = [
  {
    type: "list",
    name: "commitType",
    message: "Select a commit message type:",
    choices: [...options.map((o) => o.emojiTitle)],
    when: function (answers) {
      return answers.comments !== "Nope, all good!";
    },
  },
];

// check users global version
const checkVersion = () => {
  // only check major and minor versioning
  exec("npm show git-emoji-commit version", function (err, stdout, stderr) {
    if (
      pjson.version.trim().slice(0, -1) !=
      stdout.trim().toString("utf8").slice(0, -1)
    )
      console.log(
        `\x1b[32m`, // green
        `😎  Update available: ${stdout}`,
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
    if (stdout.length > 0) console.log(`${stdout.toString("utf8")}`);
    if (stderr.length > 0) console.log(`${stderr.toString("utf8")}`);
    checkVersion();
  });
};

// TODO: need to check for commitType without a program.args - Chance

if (program.style) {
  makeCommit(`git commit -m "💅  STYLE: ${program.args}"`);
} else if (program.bug) {
  makeCommit(`git commit -m "🐛  FIX: ${program.args}"`);
} else if (program.doc) {
  makeCommit(`git commit -m "📖  DOC: ${program.args}"`);
} else if (program.improve) {
  makeCommit(`git commit -m "⚡  REFACTOR: ${program.args}"`);
} else if (program.new) {
  makeCommit(`git commit -m "📦  FEAT: ${program.args}"`);
} else if (program.test) {
  makeCommit(`git commit -m "✅  TEST: ${program.args}"`);
} else if (program.try) {
  makeCommit(`git commit -m "🤞  TRY: ${program.args}"`);
} else if (program.build) {
  makeCommit(`git commit -m "🚀  BUILD: ${program.args}"`);
} else if (program.chore) {
  makeCommit(`git commit -m "🧹  CHORE: ${program.args}"`);
} else {
  // if no cli args
  console.log("Pick a commit type. See more: gc --help");
  inquirer.prompt(questions).then((answers) => {
    let commitType = JSON.stringify(answers.commitType, null, "  ");
    let commitTypeCleaned = commitType.replace(/\:(.*)/, "").replace(/"/, "");

    // check for commit message
    if (!program.args[0] || !program.args.length || !program.args) {
      // TODO: refactor to prevent having nested inquirer - Chance
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
}
