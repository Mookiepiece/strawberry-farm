// auto
import React from 'react';
import PageWalker from '@docs/components/PageWalker';

const requireDemo = import.meta.globEager('/src/st-assets/Form/*.tsx');

import basic from '@docs/st-assets/Form/basic.tsx?raw';
import list from '@docs/st-assets/Form/list.tsx?raw';
import computed from '@docs/st-assets/Form/computed.tsx?raw';
import pass from '@docs/st-assets/Form/pass.tsx?raw';
import remote from '@docs/st-assets/Form/remote.tsx?raw';
import message from '@docs/st-assets/Form/message.tsx?raw';

const requireRaw = {
  basic,
  list,
  computed,
  pass,
  remote,
  message,
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
