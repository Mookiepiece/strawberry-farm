/* eslint-disable no-unused-labels */
import { rollup } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
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
        resolve({
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'], // #2
        }),
        babel({
          babelHelpers: 'runtime',
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'], // #3
        }),
      ],
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
