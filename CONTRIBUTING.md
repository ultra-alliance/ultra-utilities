# Ultra utilities

Ultra utilities is a collection of tools to help developers build on the Ultra blockchain.

## Scripts

You may use the following [npm scripts](https://docs.npmjs.com/cli/v9/using-npm/scripts).
At the project root, you can run them with `npm run <script_name>`.

You can limit the scope of the script to a specific package by running:
`npm run <script_name> --scope=<package_name>`.

You can also run [Lerna commands](https://lerna.js.org/#commands) directly.
It is recommended that you use `npx` to run these commands. (i.e., `npx lerna <command>`)

### `clean`

Clean coverage results in ./coverage and runs npm run clean for each package.

### `lint`

Runs ESLint for each package.

### `check:types`

Runs the TypeScript compiler for each package without emitting any files.
This is used in a pre-push hook for a faster alternative than a full build.
Uou probably won't want to run it directly.

### `build`

Runs the TypeScript compiler for each package and emits declaration files (.d.ts).

### `test`

Runs `Jest` in [watch mode](https://jestjs.io/docs/cli#watch), runs on changed files.

This command doesn't support `--scope`, but you can narrow the test run by adding filename (path) filters in as many `...args` that follow (e.g., `npm test core/src`).

### coverage

Runs `Jest` in [coverage mode](https://jestjs.io/docs/cli#coverage), dumping coverage results in ./coverage and showing a text summary in the console output.

Feel free to add more [coverage reporters](https://jestjs.io/docs/configuration#coveragereporters-array-string) to the list. The Jest configuration can be found in the root package.json.

### `commit`

Runs [commitizen](http://commitizen.github.io/cz-cli/) commit wizard, ensuring that commit messages follow the [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/).

Use the [`git commit`](https://git-scm.com/docs/git-commit) command directly with the [`-n`, `--no-verify` option](https://git-scm.com/docs/git-commit#Documentation/git-commit.txt--n) to bypasses the pre-commit and commit-msg hooks.

## Set up a new package

When we setup a new package you just need to create a new folder in `packages`.
Then do `npm init` and `tsc --init`, and in the tsconfig paste:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist/esm",
    "rootDir": "src"
  }
}
```

In the `package.json` copy these scripts and replace `YOUR_PACKAGE_NAME` with your package name.

```json
 "scripts": {
    "clean": "cd ../.. && npx rimraf packages/YOUR_PACKAGE_NAME/dist",
    "lint": "cd ../.. && eslint packages/YOUR_PACKAGE_NAME/src/**/*.ts",
    "check-types": "yarn build -- --noEmit",
    "prebuild": "yarn clean",
    "build": "cd ../.. && tsc -p packages/YOUR_PACKAGE_NAME/tsconfig.json && tsc -p packages/YOUR_PACKAGE_NAME/tsconfig.json --module esnext --outDir ./packages/YOUR_PACKAGE_NAME/dist/cjs",
    "test": "cd ../.. && yarn test packages/YOUR_PACKAGE_NAME",
    "cover": "cd ../.. && yarn cover packages/YOUR_PACKAGE_NAME",
    "commit": "cd ../.. && yarn commit",
    "prepublishOnly": "yarn build"
  },
```

Also in the package.json paste these in:

```json
"main": "./dist/cjs/index.js",
"module": "./dist/esm/index.js",
"types": "./dist/esm/index.d.ts",
```
