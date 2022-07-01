// Generated by watchDemo.mjs, DO NOT EDIT this file
import React from 'react';
import PageWalker from '@docs/components/PageWalker';

const requireDemo = import.meta.globEager('./*.tsx');

const requireRaw = {};

import zh from './index-zh.md?raw';
import en from './index-en.md?raw';
const requireMd = { zh, en };

const Page: React.FC = () => {
  return <PageWalker requireDemo={requireDemo} requireRaw={requireRaw} requireMd={requireMd} />;
};
export default Page;
