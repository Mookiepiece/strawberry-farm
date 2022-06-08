// copy all the dist into a folder named git-release, publish it into git-release branch
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import ghpages from 'gh-pages';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');

fs.copySync(path.resolve(root, 'lib'), path.resolve(root, 'git-release/lib'));
fs.copySync(path.resolve(root, 'es'), path.resolve(root, 'git-release/es'));
fs.copySync(path.resolve(root, 'src/_theme'), path.resolve(root, 'git-release/src/_theme'));
fs.copySync(path.resolve(root, 'package.json'), path.resolve(root, 'git-release/package.json'));

ghpages.publish(
  path.resolve(root, 'git-release'),
  {
    branch: 'git-release-strawberry-farm',
  },
  err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('👌');
  }
);
