import React, { useState } from 'react';
import { Box, Button, Dialog } from '🦄';

const BasicUsage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button primary onClick={() => setVisible(true)}>
        Open Dialog
      </Button>
      <Dialog visible={visible} onClose={() => setVisible(false)}>
        <Dialog.Body>
          <Box className="p-20"> “可我除了炒鸡蛋，什么都不会。” </Box>
        </Dialog.Body>
      </Dialog>
    </>
  );
};
export default BasicUsage;
