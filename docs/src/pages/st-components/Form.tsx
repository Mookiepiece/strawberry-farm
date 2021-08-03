// auto
import React from 'react';
import PageWalker from '@docs/components/PageWalker';

const requireDemo = import.meta.globEager('/src/st-assets/Form/*.tsx');

import basic from '@docs/st-assets/Form/basic.tsx?raw';
import list from '@docs/st-assets/Form/list.tsx?raw';
import nesting from '@docs/st-assets/Form/nesting.tsx?raw';
import pass from '@docs/st-assets/Form/pass.tsx?raw';
import remote from '@docs/st-assets/Form/remote.tsx?raw';
import status from '@docs/st-assets/Form/status.tsx?raw';
import cuscontrol from '@docs/st-assets/Form/cuscontrol.tsx?raw';

const requireRaw = {
  basic,
  list,
  nesting,
  pass,
  remote,
  status,
  cuscontrol,
};

import zh from '@docs/st-assets/Form/index-zh.md?raw';
import en from '@docs/st-assets/Form/index-en.md?raw';
const requireMd = {
  zh,
  en,
};

const Page: React.FC = () => {
  return <PageWalker requireDemo={requireDemo} requireRaw={requireRaw} requireMd={requireMd} />;
};
export default Page;
