import path from 'path';
import { rollup } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { babel } from '@rollup/plugin-babel';

const runBuild = async () => {
  const inputOptions = {
    input: 'src/index.ts',
    treeshake: false,
    external: [
      'async-validator',
      "@popperjs/core",
      "react-popper",
      'zustand',
    ],
    plugins: [
      commonjs({ include: /node_modules/ }),
      peerDepsExternal(),
      resolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
      }),
      babel({
        babelHelpers: 'runtime',
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
        exclude: /node_modules/
      }),
    ],
  };
  const outOptions = {
    dir: 'dist',
    format: 'esm',
    chunkFileNames: '[name].es.js',
    entryFileNames: '[name].es.js',
    preserveModules: true,
    preserveModulesRoot: 'src',
  };
  const outOptions2 = {
    dir: 'dist',
    format: 'commonjs',
    chunkFileNames: '[name].js',
    entryFileNames: '[name].js',
    exports: 'named',
    preserveModules: true,
    preserveModulesRoot: 'src',
  };

  const bundle = await rollup(inputOptions);
  await bundle.write(outOptions);

  const bundle2 = await rollup(inputOptions);
  await bundle2.write(outOptions2);
};

runBuild();
