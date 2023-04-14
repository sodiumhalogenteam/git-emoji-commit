#!/usr/bin/env node
const program = require("commander");
const { exec: Exec } = require("child_process");
const inquirer = require("inquirer");
const { readFile } = require("fs/promises");

const commitTypes = {
  feat: {
    emoji: "📦",
    name: "FEAT",
    description: "new feature",
  },
  style: {
    emoji: "💅",
    name: "STYLE",
    description: "layout or style change",
  },
  fix: {
    emoji: "🐛",
    name: "FIX",
    description: "fix/squash bug",
  },
  chore: {
    emoji: "🧹",
    name: "CHORE",
    description: "update packages, gitignore etc; (no prod code)",
  },
  doc: {
    emoji: "📖",
    name: "DOC",
    description: "documentation",
  },
  refactor: {
    emoji: "🛠 ", // needs extra space
    name: "REFACTOR",
    description: "refactoring",
  },
  content: {
    emoji: "📝",
    name: "CONTENT",
    description: "content changes",
  },
  test: {
    emoji: "✅",
    name: "TEST",
    description: "add/edit tests (no prod code)",
  },
  try: {
    emoji: "🤞",
    name: "TRY",
    description: "add untested to production",
  },
  build: {
    emoji: "🚀",
    name: "BUILD",
    description: "build for production",
  },
};

const questions = [
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
    choices: Object.values(commitTypes).map(
      (type) => `${type.emoji} ${type.name}: ${type.description}`
    ),
    when: function (answers) {
      return answers.comments !== "Nope, all good!";
    },
  },
];

async function getPackageVersion() {
  const packageJsonRaw = await readFile("./package.json", "utf-8");
  const packageJson = JSON.parse(packageJsonRaw);
  const version = packageJson.version;
  return version;
}

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

async function hasStagedFiles() {
  try {
    await exec("git diff --cached --quiet");
    return false;
  } catch (err) {
    if (err.code === 1) {
      return true;
    }
    throw err;
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
    if (err.message.includes("nothing to commit, working tree clean")) {
      console.log(
        "There are no files staged to commit. Please stage some files before committing."
      );
    } else {
      console.error(err);
    }
  }
}

(async function main() {
  program
    .version(await getPackageVersion())
    .option("-f, --feat", "add new feature")
    .option("-s, --style", "edit/add styles")
    .option("-x, --fix", "squash bugs")
    .option("-c, --chore", "add untested to production")
    .option("-d, --doc", "add/edit documentation & content")
    .option("-r, --refactor", "refactor or rework")
    .option("-t, --test", "add/edit test")
    .option("-y, --try", "add untested to production")
    .option("-b, --build", "build for production")
    .option("--learn", "learn more about commit types")
    .parse(process.argv);

  if (program.learn) {
    console.log(
      "📚 Learn more about commit types here: https://www.conventionalcommits.org/en/v1.0.0/#summary"
    );
    return;
  }

  if (!(await hasStagedFiles())) {
    console.log(
      "There are no files staged to commit. Please stage some files before committing."
    );
    return;
  }

  const commitMessage = program.args[0];

  if (!commitMessage) {
    const answers = await inquirer.prompt(questions);
    const commitType = answers.commitType
      .replace(/\:(.*)/, "")
      .replace(/"/, "");
    await makeCommit(commitType, answers.commitMessage);
  } else {
    const commitType = Object.values(commitTypes).find((type) =>
      commitMessage.startsWith(`${type.emoji}  ${type.name}`)
    );

    if (!commitType) {
      const answers = await inquirer.prompt(questions);
      const selectedCommitType = answers.commitType;
      await makeCommit(selectedCommitType, commitMessage);
    } else {
      const message = commitMessage.slice(
        commitType.emoji.length + commitType.name.length + 2
      );
      await makeCommit(`${commitType.emoji}  ${commitType.name}`, message);
    }
  }
})();
