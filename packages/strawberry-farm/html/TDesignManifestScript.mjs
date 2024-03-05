import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const dirURL = path.resolve(url.fileURLToPath(import.meta.url), '../svgo');

const svgNames = (await fs.readdir(dirURL)).filter(s => s.endsWith('.svg'));

const manifset = [];

for (let _name of svgNames) {
  const name =
    'TDesign' +
    _name
      .split('.svg')[0]
      .trim()
      .split('-')
      .map(word =>
        word.split('').map((char, i) => (i === 0 ? char.toUpperCase() : char)).join(''),
      )
      .join('');

  const content = (await fs.readFile(path.resolve(dirURL, _name)))
    .toString()
    .trim();

  const pathRe = /d="(.+?)"/g;
  const d = pathRe.exec(content)[1];

  manifset.push('const ' + name.split('.svg')[0] + ' = "' + d + '" as const');
}

fs.writeFile(
  path.resolve(dirURL, '../TDesignManifest2.ts'),
  manifset.join('\n'),
);
