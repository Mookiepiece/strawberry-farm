## Development Guide 开发指南

#### 建议的工具

- 编辑器：Visual Studio Code

  - 需要安装 `extensions.json` 里推荐的扩展程序
  - `vscode-jest` 扩展要求 [Multi-root Workspaces](https://github.com/jest-community/vscode-jest#how-to-use-the-extension-with-monorepo-projects)，所以需要在`strawberry-farm.code-workspace`这个工作区里工作。

- 包管理器：pnpm （为了支持 workspaces）
- Node.js：>= v13 （为了支持直接执行.mjs 文件）

#### 工作流程

- yarn dev: 开发，启动文档。
- yarn devw: 根据文档`pages`目录的`index-en.md`自动生成`index.tsx`。
- yarn build: 构建
  - build_types: 使用 typescript cli 生成 ts 声明文件，文件目录结构会被保留.
  - build_comp: 执行 `build.mjs`, 使用 rollup 打包。

#### Rollup

rollup 配置参考 [webrix](https://github.com/open-amdocs/webrix)。

- 都说`Webpack`在开发模式没有启用`tree-shaking`，由于`Vite`成为主流，也不需要关注`babel-plugin-import`了。
- `package.json`的`exports`字段可以暴露多个子目录，但`Eslint`和旧版本`Webpack`可能不认识这个字段，如果要支持这个字段，构建产物的命名不要太放纵，最好每个文件的`cjs`和`esm`在同一目录下，如果有时候引入了`cjs`有时候引入了`esm`，会因为引用不等而出问题。
