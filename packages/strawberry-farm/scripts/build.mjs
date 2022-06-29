import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { rollup } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import renameNodeModules from 'rollup-plugin-rename-node-modules';
import { babel } from '@rollup/plugin-babel';

const runBuild = async () => {
  const inputOptions = {
    input: 'src/index.ts',
    treeshake: false,
    external: ['async-validator', '@popperjs/core', 'react-popper', 'zustand'],
    plugins: [
      renameNodeModules(),
      commonjs(),
      peerDepsExternal(),
      resolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
      }),
      babel({
        babelHelpers: 'runtime',
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
      }),
    ],
  };
  const outOptions = {
    dir: 'dist',
    format: 'esm',
    chunkFileNames: '[name].js',
    entryFileNames: '[name].js',
    preserveModules: true,
    preserveModulesRoot: 'src',
  };

  const bundle = await rollup(inputOptions);
  await bundle.write(outOptions);
};

console.time();

await runBuild();

const root = path.resolve(fileURLToPath(import.meta.url), '../..');

fs.copySync(path.resolve(root, 'src/theme'), path.resolve(root, 'dist/theme'));
fs.copySync(path.resolve(root, 'package.json'), path.resolve(root, 'dist/package.json'));

console.timeEnd();
