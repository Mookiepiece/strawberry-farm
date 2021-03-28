import React from 'react';
import PageWalker from '🦌/components/PageWalker';

const requireDemo = require.context('../../assets/StForm', false, /\.tsx$/);
const requireRaw = require.context('!raw-loader!../../assets/StForm', false, /\.(md|tsx)$/);

const Page: React.FC = () => {
  return <PageWalker requireDemo={requireDemo} requireRaw={requireRaw} />;
};
export default Page;
