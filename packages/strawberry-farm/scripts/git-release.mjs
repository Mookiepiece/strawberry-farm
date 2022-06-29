import path from 'path';
import { fileURLToPath } from 'url';
import ghpages from 'gh-pages';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');

ghpages.publish(
  path.resolve(root, 'dist'),
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
