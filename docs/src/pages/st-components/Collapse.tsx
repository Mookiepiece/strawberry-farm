// auto
import React from 'react';
import PageWalker from '@docs/components/PageWalker';

const requireDemo = import.meta.globEager('/src/st-assets/Collapse/*.tsx');

import individual from '@docs/st-assets/Collapse/individual.tsx?raw';

const requireRaw = {
  individual,
};

import zh from '@docs/st-assets/Collapse/index-zh.md?raw';
import en from '@docs/st-assets/Collapse/index-en.md?raw';
const requireMd = {
  zh,
  en,
};

const Page: React.FC = () => {
  return <PageWalker requireDemo={requireDemo} requireRaw={requireRaw} requireMd={requireMd} />;
};
export default Page;
