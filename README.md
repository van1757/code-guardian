[![CircleCI](https://circleci.com/gh/AndreiPiatrou/code-guardian/tree/master.svg?style=svg)](https://circleci.com/gh/AndreiPiatrou/code-guardian/tree/master)

# code-guardian
Simple cli tool to check a code against different kinds of issues
### Currently supported checks

- sensitive data: keys, secrets, passwords
- private key and certificate files

### How to install

```bash
npm i -g code-guardian
```

### How to start

```bash
cd your-repo
code-guardian

# for more details
code-guardian --help
```

### Practices and tools applied

- CircleCI: `test` for all branches, `deploy` only for `master`
- ESLint: injected as a build step
- mocha: `npm t` is a part of CI `build` step
- semantic-versioning
