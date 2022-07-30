import React, { useState } from 'react';
import { Button, Popover } from '🦄';

const BasicUsage: React.FC = () => {
  return (
    <div
      style={{
        display: 'grid',
        gap: 20,
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      }}
    >
      <Popover popup={<p>asdsd</p>} trigger="focus" popupClassName="sf-popper--default">
        <Button primary>trigger=`focus`</Button>
      </Popover>
      <Popover popup={<p>asdsd</p>} popupClassName="sf-popper--default" trigger="click">
        <Button primary>trigger=`click`</Button>
      </Popover>
      <Popover
        popup={<p>Note that this will also trigger on focus because i want it to be accessable</p>}
        popupClassName="sf-popper--default"
        trigger="hover"
      >
        <Button primary>trigger=`hover` </Button>
      </Popover>
    </div>
  );
};
export default BasicUsage;
