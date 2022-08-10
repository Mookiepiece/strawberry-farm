import React, { useState } from 'react';
import { Button, Notification } from '🦄';

const BasicUsage: React.FC = () => {
  return (
    <>
      <Button primary onClick={() => Notification.push(<h1 style={{fontSize:undefined}}>abcdefg</h1>)}>
        打开对话框
      </Button>
    </>
  );
};
export default BasicUsage;
