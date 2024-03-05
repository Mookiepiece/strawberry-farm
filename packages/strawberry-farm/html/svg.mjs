import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const dirURL = path.resolve(url.fileURLToPath(import.meta.url), '../svg');

// SVG_ALL_IN: {
//   const svgNames = await fs.readdir(dirURL);

//   let svgContents = [];
//   for (const p of svgNames) {
//     svgContents.push(await fs.readFile(path.resolve(dirURL, p)));
//   }

//   fs.writeFile(
//     path.resolve(dirURL, './output.txt'),
//     svgContents.map((c, i) => svgNames[i] + '\n' + c).join('\n---\n'),
//   );
// }
OUTPUT_TO_PATH: {
  const svgs = (await fs.readFile(path.resolve(dirURL, './output.txt')))
    .toString()
    .split('---');

  const pathRe = /(d=".+?")/g;

  const lineBreakRe = /\n/gm;

  const anal = [];

  const a = svgWithName => {
    const nameRe = /(.+?)\n(.+)/gms;
    const [, name, content] = nameRe.exec(svgWithName);

    const isComplexSVG = [...content.trim().matchAll(lineBreakRe)].length > 3;
    console.log(name, isComplexSVG);

    anal.push(name + ' ' + isComplexSVG);
  };

  svgs.forEach(a);

  fs.writeFile(path.resolve(dirURL, './anal.txt'), anal.join('\n'));
}
