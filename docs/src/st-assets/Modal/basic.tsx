import React, { useState } from 'react';
import { Button, Modal } from 'starfall';

const BasicUsage: React.FC = () => {
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);
  return (
    <>
      <Button primary onClick={() => setState(true)}>
        Open Modal
      </Button>
      <Modal title="标题" visible={state} onClose={() => setState(false)}>
        Content
        <Button onClick={() => setState2(true)}>Open another</Button>
      </Modal>
      <Modal title="标题" visible={state2} onClose={() => setState2(false)}>
        Second Modal
      </Modal>
    </>
  );
};
export default BasicUsage;
