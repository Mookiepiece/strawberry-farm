/* eslint-disable no-unused-labels */
import { rollup } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { babel } from '@rollup/plugin-babel';
import path from 'path';
import fs from 'fs-extra';

const runBuild = async () => {
  Duplicate_Types: {
    fs.copySync(path.resolve('./lib'), path.resolve('./es'));
  }
  Build_Components: {
    const components = fs
      .readdirSync(path.resolve('./src'))
      .filter(n => !n.startsWith('_'))
      .filter(n => fs.statSync(path.resolve('./src', n)).isDirectory());

    const inputOptions = {
      input: components.reduce(
        (map, name) => ({ ...map, [name]: path.resolve(`./src/${name}/index.ts`) }),
        {}
      ), // #1
      plugins: [
        peerDepsExternal(),
        commonjs(),
        resolve({
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'], // #2
        }),
        babel({
          babelHelpers: 'runtime',
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'], // #3
        }),
      ],
      external: [/^@mookiepiece\/starfall-utils/],
      //  #4
    };
    const outOptions = {
      dir: 'lib',
      entryFileNames: '[name]/index.js',
      format: 'commonjs',
      exports: 'auto',
    };
    const outOptions2 = {
      dir: 'es',
      entryFileNames: '[name]/index.js',
      format: 'esm',
    };
    const bundle = await rollup(inputOptions);
    await bundle.write(outOptions);
    const bundle2 = await rollup(inputOptions);
    await bundle2.write(outOptions2);
  }
  Copy_Index: {
    const inputOptions = {
      input: path.resolve('./src/index.ts'),
      plugins: [
        peerDepsExternal(),
        resolve({
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
        }),
        babel({
          babelHelpers: 'runtime',
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
        }),
      ],
      external: [/^.*/],
    };
    const outOptions = {
      dir: 'lib',
      format: 'commonjs',
      exports: 'auto',
    };
    const outOptions2 = {
      dir: 'es',
      format: 'esm',
      exports: 'auto',
    };

    const bundle = await rollup(inputOptions);
    await bundle.write(outOptions);
    const bundle2 = await rollup(inputOptions);
    await bundle2.write(outOptions2);
  }
};

runBuild();

// #1
// https://rollupjs.org/guide/en/#input
// Unless the output.file option is used,
// generated chunk names will follow the output.entryFileNames option.
// Default: "[name].js"
// when a component wants to have a import from utils or other component directiory

// #2
// if we dont use typescript plugin, then we need to told rollup our extensions
// this can be remove if we import typescript from 'rollup-plugin-typescript2'

// #3
// we tell babel to process `--extensions` files
// like setting [ test: /.ts/ ] in webpack
// https://babeljs.io/docs/en/babel-preset-typescript

// we have many resolvers for each build tool
// tsconfig.json                 -> typescript + vscode intellisense
// eslintrc import resolver      -> if `eslint-plugin-import` installed
// rollup config.output.alias    -> rollup (signle component/util)
// rollup-plugin-alias           -> rollup (bundle everything)
// jest moduleNameMapper in my starfall/package.json  -> jest

// #4
// not adding externals is fine because we're bunding our file at one time, public assets will be extract

// #5
// we build commonjs for webpack dev mode, sadness.

// #6
// we assume that our utils directory has no sub directory
// and when a util file wants import from another util file
// also imports need starts with .. to avoid not to be bundled in.
// same as other components
