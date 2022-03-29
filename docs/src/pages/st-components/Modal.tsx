// auto
import React from 'react';
import PageWalker from '@docs/components/PageWalker';

const requireDemo = import.meta.globEager('/src/st-assets/Modal/*.tsx');

import basic from '@docs/st-assets/Modal/basic.tsx?raw';
import imperative from '@docs/st-assets/Modal/imperative.tsx?raw';

const requireRaw = {
  basic,
  imperative,
};

import zh from '@docs/st-assets/Modal/index-zh.md?raw';
import en from '@docs/st-assets/Modal/index-en.md?raw';
const requireMd = {
  zh,
  en,
};

const Page: React.FC = () => {
  return <PageWalker requireDemo={requireDemo} requireRaw={requireRaw} requireMd={requireMd} />;
};
export default Page;
