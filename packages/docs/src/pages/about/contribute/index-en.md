## Development Guide

#### Recommended tools:

- Editor：Visual Studio Code

  - With extensions listed in `extensions.json` installed.
  - `vscode-jest` requires [Multi-root Workspaces](https://github.com/jest-community/vscode-jest#how-to-use-the-extension-with-monorepo-projects)，so make sure you are opening `strawberry-farm.code-workspace` this workspace.

- Package Manager: pnpm (to support workspaces)
- Node.js: >= v13 (to support `.mjs` file )

#### Workflow

- yarn dev: develop, run docs.
- yarn devw: generate `index.tsx` for each `index-en.md` in `pages` folder.
- yarn build:
  - build_types: geneate d.ts.
  - build_comp: excute `build.mjs`, bundle with rollup.

#### Rollup

this rollup config is inspired by [webrix](https://github.com/open-amdocs/webrix)。

- `Webpack` only enables `tree-shaking` in production, but as `Vite` becomes more and more popular, `babel-plugin-import` is no longer needed now.
- `exports` field in `package.json` has the functionality to export sub folders, but `Eslint`and `Webpack` may not recognize it, if you want to support this field, you may make sure `cjs` and `esm` for each exported file is in the same folder, if we sometimes import the `cjs` version and sometimes `esm`, we may met problems as the are not the same reference.
