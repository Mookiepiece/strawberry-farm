import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const tpl = demos =>
  `// Generated by watchDemo.mjs, DO NOT EDIT this file
import React from 'react';
import PageWalker from '@docs/components/PageWalker';

const requireDemo = import.meta.globEager('./*.tsx');

${demos.map(n => `import ${n} from './${n}.tsx?raw';\n`).join('')}
const requireRaw = {
${demos.map(n => `  ${n},\n`).join('')}};

import zh from './index-zh.md?raw';
import en from './index-en.md?raw';
const requireMd = { zh, en };

const Page: React.FC = () => {
  return <PageWalker requireDemo={requireDemo} requireRaw={requireRaw} requireMd={requireMd} />;
};
export default Page;
`;

const PAGES_DIR_PATH = path.resolve(fileURLToPath(import.meta.url), '../../src/pages/');

const demoRE = /::demo\{(.*?)\}/;
const demoREG = /::demo\{(.*?)\}/g;

const makeWatcher = () => {
  const caches = new Map();
  chokidar
    .watch(PAGES_DIR_PATH, {
      depth: 2,
    })
    .on('all', (event, filePath, stats) => {
      const pathes = path.relative(PAGES_DIR_PATH, filePath).split('\\');

      if (stats.isDirectory()) {
        // Find index-en.md and demos it requires.
        if (fs.readdirSync(filePath).some(i => i === 'index-en.md')) {
          const md = fs.readFileSync(path.resolve(filePath, 'index-en.md')).toString();
          const demos = md.match(demoREG)?.map(s => demoRE.exec(s)[1]);
          if (!demos) return;

          // Create or Update index.tsx.
          const indexFilePath = path.resolve(filePath, 'index.tsx');
          const t = tpl(demos);
          if (fs.existsSync(indexFilePath) ? fs.readFileSync(indexFilePath).toString() : '' !== t) {
            console.log('file changed: ', demos);
            fs.writeFileSync(indexFilePath, t);
          }
        }
      }
    });
};

makeWatcher();

//
// Utils
// ----------------------------------------------------------------------

function debounce(fn, delay) {
  let timeoutID;
  return function (...args) {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
