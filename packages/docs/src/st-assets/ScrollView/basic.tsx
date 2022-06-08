import React from 'react';
import { ScrollView } from '🦄';

const BasicUsage: React.FC = () => {
  return (
    <>
      <ScrollView wrapStyle={{ height: 200, fontSize: '18px' }}>
        <div style={{ whiteSpace: 'pre-wrap' }}>{'. \n'.repeat(30)}</div>
      </ScrollView>
      <br />
      <br />
      <ScrollView wrapStyle={{ height: 200, width: 200, fontSize: '18px' }}>
        <div style={{ whiteSpace: 'nowrap' }}>{'. '.repeat(150)}</div>
      </ScrollView>
      <br />
      <br />
      <ScrollView wrapStyle={{ height: 200, width: 200, fontSize: '18px' }}>
        <div style={{ whiteSpace: 'nowrap' }}>{'not scrollable'}</div>
      </ScrollView>
      <br />
      <br />
      <ScrollView wrapStyle={{ height: 200, width: 200, fontSize: '18px' }}>
        <div>
          <div style={{ width: 400, height: 600, background: 'powderblue' }}></div>
        </div>
      </ScrollView>
    </>
  );
};
export default BasicUsage;
