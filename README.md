# Git Emoji Commit 📦

[![git-emoji-commit npm version](https://img.shields.io/npm/v/git-emoji-commit.svg)](https://npmjs.org/package/git-emoji-commit)
[![git-emoji-commit npm downloads](https://img.shields.io/npm/dt/git-emoji-commit.svg)](https://npmjs.org/package/git-emoji-commit)

Simple CLI to encourage more concise commits.

![git-emoji-commit](./assets/git-emoji-commit.gif)

## setup

- \$ `npm i -g git-emoji-commit`
- \$ `git-emoji-commit --help` to see options

## usages

- \$`gec` to start the commit prompts or
- \$`gec "YOUR COMMIT MESSAGE"` or
- \$`gec --[option] "YOUR COMMIT MESSAGE"`

## why?

To encourage more concise commits. Each commit type helps you keep your changes organized and brief.

Commit early, commit often.
PR early, PR often.

## git-emoji-commit workflow

- \$`git add .`
- \$`gec "YOUR COMMIT MESSAGE"` to make a commit
- \$`git push`

## commit types

| Commit Type      | Emoji | Flag                 |
| ---------------- | ----- | -------------------- |
| New Feature      | 📦    | `--feat` or `-f`     |
| Style            | 🎨    | `--style` or `-s`    |
| Bugfix           | 🐛    | `--fix` or `-x`      |
| Chore            | 🧹    | `--chore` or `-c`    |
| Documentation    | 📚    | `--doc` or `-d`      |
| Refactor         | 🛠     | `--refactor` or `-r` |
| Content          | 📝    | `--content` or `-n`  |
| Test             | ✅    | `--test` or `-t`     |
| Try              | 🤞    | `--try` or `-y`      |
| Build            | 🚀    | `--build` or `-b`    |
| Naked (no emoji) |       | `--naked` or `-n`    |

## details

- `--help` or `-h` to see options
- `--version` or `-V` to see version
