# Local Dev >> Git Emoji Commit 📦

## local setup

- `npm install`
- `node cli.js` to run the script (ex: `node cli.js "YOUR COMMIT MESSAGE"`)

## local package testing before publish

- uninstall global version \$`npm uninstall -g git-emoji-commit`
- create new package \$`npm pack` to create tarbal.
- check contents of new package \$`tar -tf git-emoji-commit-0.5.0.tgz`
- install local copy of package \$`npm install -g ~/wip/git-emoji-commit/git-emoji-commit-0.5.0.tgz` (check path and name of tarbal)
- test \$`git-emoji-commit`

Or a one liner might look like:

```
npm uninstall -g git-emoji-commit && npm pack && tar -tf "$(npm pack | tail -n 1)" && npm install -g ~/wip/git-emoji-commit/"$(npm pack | tail -n 1)"
```

## When you're done testing

Unintall local package \$`npm uninstall -g git-emoji-commit` again and reinstall global version \$`npm install -g git-emoji-commit` to get the latest version from NPM.
