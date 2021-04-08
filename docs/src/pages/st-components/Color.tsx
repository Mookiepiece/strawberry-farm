import React from 'react';
import PageWalker from '🦌/components/PageWalker';

const requireDemo = require.context('../../st-assets/Color', false, /\.tsx$/);
const requireRaw = require.context('!raw-loader!../../st-assets/Color', false, /\.(md|tsx)$/);

const Page: React.FC = () => {
  return <PageWalker requireDemo={requireDemo} requireRaw={requireRaw} />;
};
export default Page;
