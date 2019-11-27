# Git Emoji Commit 📦

[![git-emoji-commit npm version](https://img.shields.io/npm/v/git-emoji-commit.svg)](https://npmjs.org/package/git-emoji-commit)
[![git-emoji-commit npm downloads](https://img.shields.io/npm/dt/git-emoji-commit.svg)](https://npmjs.org/package/git-emoji-commit)

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

- \$`git add .`
- \$`gec` to make a commit
- \$`git pull`
- \$`git push`

## todos

- [x] check what version user has, prompt for update if old
- [x] output log messages after commit (can't see JEST output on git hooks)
- [ ] landing page
- [ ] add tests
- [ ] account for entry with an option but no message - \$`gec --[option]`

## low todos

- [ ] update example gif
