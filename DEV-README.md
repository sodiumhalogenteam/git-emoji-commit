# Local Dev >> Git Emoji Commit 📦

## local package testing before publish

- uninstall global version \$`npm uninstall -g git-emoji-commit`
- create new package \$`npm pack` to create tarbal.
- check contents of new package \$`tar -tf git-emoji-commit-0.5.0.tgz`
- install local copy of package \$`npm install -g ~/wip/git-emoji-commit/git-emoji-commit-0.5.0.tgz` (check path and name of tarbal)
- test \$`git-emoji-commit`

Unintall local package \$`npm uninstall -g git-emoji-commit` again and reinstall global version \$`npm install -g git-emoji-commit` to get the latest version from NPM.