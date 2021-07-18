// auto
import React from 'react';
import PageWalker from '@docs/components/PageWalker';

const requireDemo = import.meta.globEager('/src/st-assets/Popper/*.tsx');

import basic from '@docs/st-assets/Popper/basic.tsx?raw';
import popover from '@docs/st-assets/Popper/popover.tsx?raw';

const requireRaw = {
  basic,
  popover,
};

import zh from '@docs/st-assets/Popper/index-zh.md?raw';
import en from '@docs/st-assets/Popper/index-en.md?raw';
const requireMd = {
  zh,
  en,
};

const Page: React.FC = () => {
  return <PageWalker requireDemo={requireDemo} requireRaw={requireRaw} requireMd={requireMd} />;
};
export default Page;
