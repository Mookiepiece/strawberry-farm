// auto
import React from 'react';
import PageWalker from '@docs/components/PageWalker';

const requireDemo = import.meta.globEager('/src/st-assets/Select/*.tsx');

import basic from '@docs/st-assets/Select/basic.tsx?raw';

const requireRaw = {
  basic,
};

import zh from '@docs/st-assets/Select/index-zh.md?raw';
import en from '@docs/st-assets/Select/index-en.md?raw';
const requireMd = {
  zh,
  en,
};

const Page: React.FC = () => {
  return <PageWalker requireDemo={requireDemo} requireRaw={requireRaw} requireMd={requireMd} />;
};
export default Page;
