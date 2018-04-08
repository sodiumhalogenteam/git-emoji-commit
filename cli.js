#!/usr/bin/env node

const program = require("commander");
const { exec } = require("child_process");

program
  .version("0.1.0")
  .option("-s, --style", "edit/add styles")
  .option("-b, --bug", "squash bugs")
  .option("-i, --improve", "refactor or rework")
  .option("-r, --release", "release feature")
  .option("-n, --new", "add new feature")
  .option("-d, --doc", "add/edit documentation")
  .parse(process.argv);

if (program.style) {
  let command = 'git commit -m "💅 STYLE: ' + program.args + '"';
  exec(command, function(err, stdout, stderr) {
    console.log(stdout.toString("utf8"));
    if (!err) console.log("You're ready to push.");
  });
}

if (program.bug) {
  let command = 'git commit -m "🐛 BUG: ' + program.args + '"';
  exec(command, function(err, stdout, stderr) {
    console.log(stdout.toString("utf8"));
    if (!err) console.log("You're ready to push.");
  });
}

if (program.improve) {
  let command = 'git commit -m "⚡ IMPROVE: ' + program.args + '"';
  console.log(command);
  exec(command, function(err, stdout, stderr) {
    console.log(stdout.toString("utf8"));
    if (!err) console.log("You're ready to push.");
  });
}

if (program.release) {
  let command = 'git commit -m "🚀 RELSEASE: ' + program.args + '"';
  exec(command, function(err, stdout, stderr) {
    console.log(stdout.toString("utf8"));
    if (!err) console.log("You're ready to push.");
  });
}

if (program.new) {
  let command = 'git commit -m "📦 NEW: ' + program.args + '"';
  exec(command, function(err, stdout, stderr) {
    console.log(stdout.toString("utf8"));
    if (!err) console.log("You're ready to push.");
  });
}

if (program.doc) {
  let command = 'git commit -m "📖 DOC: ' + program.args + '"';
  exec(command, function(err, stdout, stderr) {
    console.log(stdout.toString("utf8"));
    if (!err) console.log("You're ready to push.");
  });
}
