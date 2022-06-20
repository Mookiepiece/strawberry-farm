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
  Rollup: {
    const inputOptions = {
      input: path.resolve('./src/index.ts'),
      treeshake: false,
      external: [
        'react',
        'react-dom',
        'react-use',
        'async-validator',
        'zustand',
        '@popperjs/core',
        'react-popper',
        'react-transition-group',
      ],
      plugins: [
        peerDepsExternal(),
        commonjs(),
        resolve({
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'], // #2
        }),
        babel({
          babelHelpers: 'runtime',
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'], // #3
          exclude: /node_modules/,
        }),
      ],
    };
    const outOptions = {
      dir: 'lib',
      format: 'commonjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      exports: 'named',
    };
    const outOptions2 = {
      dir: 'es',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
    };
    const bundle = await rollup(inputOptions);
    await bundle.write(outOptions);
    const bundle2 = await rollup(inputOptions);
    await bundle2.write(outOptions2);
  }
};

runBuild();
