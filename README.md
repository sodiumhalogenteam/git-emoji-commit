# Git Emoji Commit 📦

[![git-emoji-commit npm version](https://img.shields.io/npm/v/git-emoji-commit.svg)](https://npmjs.org/package/git-emoji-commit)

Simple CLI to encourage more concise commits.

![git-emoji-commit](./assets/git-emoji-commit.gif)

## setup

- \$ `npm i -g git-emoji-commit`
- \$ `git-emoji-commit --help` to see options

## usages

- \$`git-emoji-commit` or
- \$`gec` or
- \$`gec "YOUR COMMIT MESSAGE"` or
- \$`gec --[option] "YOUR COMMIT MESSAGE"`

## git-emoji-commit workflow

- \$`git add .` or create alias \$`ga`
- \$`git-emoji-commit` or \$`gec`
- \$`git pull` or create alias \$`gl`
- \$`git push` or create alias \$`gp`

## todos

- [x] check what version user has, prompt for update if old
- [ ] output log messages after commit (can't see JEST output on git hooks)
- [ ] compile for NPM package
- [ ] account for entry with an option but no message - \$`gec --[option]`

## low todos

- [ ] update example gif
