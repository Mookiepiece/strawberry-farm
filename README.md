<h1 align="center">Strawberry Farm - 草莓农场</h1>
<p align="center">
  <img src="https://github.com/Mookiepiece/strawberry-farm/blob/dev/docs/src/logo.png" width="200px" alt="logo" />
</p>
<p align="center">Unobtrusive park.</p>
<p align="center">开垦乐园</p>

[Visit HomePage（访问主页）https://mookiepiece.github.io/strawberry-farm](https://mookiepiece.github.io/strawberry-farm/#/index)

## Table of Contents - 目录

- [Development Guide - 开发指南](#development-guide---开发指南)
- [Project Overview - 概览](#project-overview---概览)

## Development Guide - 开发指南

#### 建议的工具：

- 编辑器：Visual Studio Code (需要安装 `extensions.json` 里推荐的扩展程序) ( `vscode-jest` 扩展要求 [Multi-root Workspaces](https://github.com/jest-community/vscode-jest#how-to-use-the-extension-with-monorepo-projects), 根目录 strawberry-farm 因为配置信息不足不能让 `vscode-jest` 跑测试所以在 `settings.json` 里屏蔽了)
- 包管理器：Yarn （为了支持 monorepo/workspaces）
- Node.js：>= v13 （为了支持直接执行.mjs 文件）

#### 项目结构：

- docs: 网站
  - src/assets: markdown 及示例
  - src/components/PageWalker: 从 assets 读取数据并生成网页, 使用了 `react-markdown` 和 `require.context`
  - src/components/DemoPlayer: render examples, 使用了 `react-syntax-highlighter`
- strawberry-farm: 工作目录

#### 工作流程：

- yarn dev: 开发，启动网页文档，然后便可以添加示例，修改组件并且在文档里实时看到变化.
- yarn build: 构建
  - build_types: 使用 typescript cli 生成 ts 声明文件到`dist`，文件目录结构会被保留.
  - build_comp: 执行 `scripts/build.components.mjs`, 使用 rollup 打包每个组件文件夹输出到 `dist/[Name]`，并不是每个文件夹都打包一次！只有两次打包，一次是打包所有组件 components，一次是打包工具 utils，因为 rollup 支持设置多个入口，分文件夹打包是为了支持`babel-plugin-import`。webpack 不支持 es module 输出，所以有服务端渲染就该用 commonjs，所以 components 是 commonjs 形式。
  - build_bundle: run `scripts/rollup.bundle.config.js`, 使用 rollup 打包到单个文件输出到 `dist`.
- yarn example: 在`yarn build` 执行后，本地测试打包后的文件是否正常运行.
- yarn docs_build docs_deploy: 打包网站及上传到 github pages.

#### Recommended tools:

- Code Editor: Visual Studio Code (with recommended extensions listed in `extensions.json` installed) (`vscode-jest` extension requires [Multi-root Workspaces](https://github.com/jest-community/vscode-jest#how-to-use-the-extension-with-monorepo-projects), root folder `strawberry-farm` cannot run any tests and was banned in `settings.json` due to lake of information of each indivisual packages)
- Package Manager: Yarn (to support monorepo/workspaces)
- Node.js: >= v13 (to support excute .mjs file directly)

#### Project Structure:

- docs: the website
  - src/assets: markdown and examples
  - src/components/PageWalker: read from assets and generate a component page, using `react-markdown` and `require.context`
  - src/components/DemoPlayer: render examples, using `react-syntax-highlighter`
- example: for local testing if the build/bundled output files is transferred correctly.
- strawberry-farm: working directory

#### Workflow:

- yarn dev: run website, and you'll able to edit components and add examples and see changes.
- yarn build_types: using typescript cli to generate ts declaration file to `dist`, folder structure is preserved.
- yarn build_comp: excute `scripts/build.components.mjs`, using rollup to transfer every components, output to `dist/[Name]` for each folder/components to supporting `babel-plugin-import`. This will not rollup each folder but only rollup twice! once for components another for utils, because rollup supports multiple entry points.
- yarn build_bundle: excute `scripts/rollup.bundle.config.js`, using rollup to transfer and bundle in single output file to `dist`.
- yarn example: require `yarn build` excuted, local testing dist files after build.
- yarn docs_build docs_deploy: pack the website and upload to github pages.

## Project Overview - 概览

本文文中的外链请务必查看和理解

#### 踩雷先驱

这些文章和项目或许比本文写得更好：

- [Creating a Library of React Components using Create React App](https://hackernoon.com/creating-a-library-of-react-components-using-create-react-app-without-ejecting-d182df690c6b)
- [Creating a React Component Library using Rollup, Typescript, Sass and Storybook](https://github.com/HarveyD/react-component-library)
- [58-magic/react-component-template](https://github.com/58-magic/react-component-template)
- [tjx666/react-typescript-boilerplate 从零开始配置 react + typescript](https://github.com/tjx666/react-typescript-boilerplate)

#### Prior Art

Those article may better than this README：

- [Creating a Library of React Components using Create React App](https://hackernoon.com/creating-a-library-of-react-components-using-create-react-app-without-ejecting-d182df690c6b)
- [Creating a React Component Library using Rollup, Typescript, Sass and Storybook](https://github.com/HarveyD/react-component-library)
- [58-magic/react-component-template](https://github.com/58-magic/react-component-template)
- [tjx666/react-typescript-boilerplate 从零开始配置 react + typescript](https://github.com/tjx666/react-typescript-boilerplate)

NO English translations for rest sections in this chapter

#### 关于 js 库

开发一个 js 库，按照约定须转义成编译好的 js 文件才能发布到 npm，因为为了打包速度我们一般配置我们的构建工具不去转义 node_modules 目录下的文件的比如[razzle -> createConfigAsync.js](https://github.com/jaredpalmer/razzle/blob/cd685bae3c71fbaf4a5dae7ae2856d97349d45c7/packages/razzle/config/createConfigAsync.js#L526)
包括此项目的 docs 底下的 webpack.config.js 你也可以看到 `exclude: /node_modules/` 。如果你是给自己用的当然可以[设置到 babel 的白名单里](https://github.com/babel/babel-loader/issues/171)，

[聊聊 package.json 文件中的 module 字段（zh）](https://loveky.github.io/2018/02/26/tree-shaking-and-pkg.module/)。

#### 关于 tree shaking

`tree shaking`只对`ES Module (ESM)` 文件生效。所以本项目用 `rollup` 构建`ESM` 输出。`webpack` 的 `ESM` 输出还在实验阶段。`typescript-cli`也支持`ESNext`输出，`babel-cli`也支持配置不转换模块语法。

`webpack` 生产环境才会启用`tree shaking`，[material-ui: minimizing-bundle-size](https://material-ui.com/guides/minimizing-bundle-size/#when-and-how-to-use-tree-shaking)这篇指南介绍得非常详细，所以如果你的库很大，需要借助`babel-plugin-import`将 `import { Component } from 'my-lib'`转换成`import Component from 'my-lib/Component'`提升开发模式的编译速度，后者因为路径写得更细，所以只引入需要的文件。

#### 关于 css

`element` 、 `antd` 都支持直接引入其 `less/scss` 文件。

注意在 js 文件里 `import '.css'` 并不是标准 `ESM` 的语法，而是打包工具的插件（比如 `webpack` 需要安装 `css-loader` ）所支持的。一个喜闻乐见的悲剧是`@antd/pro-components`要求`less`和`less-loader`。

#### 关于打包工具

一些参考的项目如下(不一定全和准确)：

- element-plus： 只介绍 build:bundle，和 build:esm 两个，[build:bundle 使用了 webpack](https://github.com/element-plus/element-plus/blob/f2091973c1/build/webpack.config.js) ，此次构建会生成单文件输出，同时可能是因为 webpack 加了`@babel/typescript`插件，会额外生成好各目录的 d.ts 文件，[build:esm 会跑一个脚本](https://github.com/element-plus/element-plus/blob/f2091973c191aad66e62ff2d890b8239dab7163f/package.json#L17)，这个脚本调用 rollup 对每个组件打包以支持前文提到的`babel-plugin-import`，build 目录有个 getCpus.js 很迷惑，因为前文提到 rollup 是设置了多个入口只进行一次打包就能处理这些文件夹。d.ts 在这次不会生成，因为前一步生成好了
- zent：有很多 sh 脚本，windows 没有 rm 命令所以没办法跑，目测是 typescript-cli 直接转义成 js 和相关的 d.ts 文件，结果文件里能看到 polifill 从 tslib 引入，没有使用打包工具。
- mui: 有看到使用[typescript-cli](https://github.com/mui-org/material-ui/blob/5511e9c32fda435d7de7c64a44ba8c32483dab44/scripts/buildTypes.js#L44)并且配置了`emitDeclarationOnly`专门生成 d.ts 文件，本项目的 build:types 参考了这个步骤，其余没看。
- wojtekmaj/react-daterange-picker：生产环境下的小众库代表，用[babel-cli 和 less-cli 直接转义](https://github.com/wojtekmaj/react-daterange-picker/blob/f3fb47fee4afbfff838dc7f7a80081c8bcd4c40e/package.json#L8-L10)，没有使用打包工具。
- aakashns/simple-component-library："rm -rf dist && NODE_ENV=production `babel` src/lib --out-dir dist --copy-files ......"， 也是 babel 直接转义
- HarveyD/react-component-library：`"build": "rollup -c"`，rollup-plugin-postcss 自带了 inject 所以能注入样式表到 js 文件里，但是还是不建议在 js 里写 css，在用户的项目里，硬编码在 js 里的 css 不能被 postcss 察觉和转码也不够灵活

#### 其它

官网是部署在 github pages 下的，国内网络不能访问

如果连接不上 github，fatal: unable to access，尝试把 git remote [从 https 改成 ssh](https://www.zhihu.com/question/26954892)

starfall 和 strawberry 的 tsconfig 路径映射会和 docs 冲突，尽量命名不冲突的映射。
