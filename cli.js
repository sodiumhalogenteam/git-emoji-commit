#!/usr/bin / env node

const program = require('commander');
const {
  exec
} = require('child_process');

program
  .version('0.1.0')
  .option('-s, --style', 'edit/add styles')
  .option('-b, --bug', 'squash bugs')
  .option('-i, --improve', 'refactor or rework')
  .option('-r, --release', 'release feature')
  .option('-n, --new', 'add new feature')
  .option('-d, --doc', 'add/edit documentation')
  .parse(process.argv);

console.log('you created a commit:');
// WIP - need to turn these into terminal commands - Chance

if (program.style) {
  // let command = 'ls'
  // let command = 'gc "💅 STYLE: ' + program.args + '"'
  let command = 'gc "STYLE: "'

  exec(command, function (err, stdout, stderr) {
    console.log(stdout.toString('utf8'))
  })
}
if (program.bug) console.log('gc "🐛 BUG: %j"', program.args);
if (program.improve) console.log('gc "👌 DOC: %j"', program.args);
if (program.release) console.log('gc "🚀 RELSEASE: %j"', program.args);
if (program.new) console.log('gc "📦 NEW: %j"', program.args);
if (program.doc) console.log('gc "📖 DOC: %j"', program.args[0]);