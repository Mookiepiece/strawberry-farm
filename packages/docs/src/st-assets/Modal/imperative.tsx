import React from 'react';
import { Button, Modal, Notification } from '🦄';

const BasicUsage: React.FC = () => {
  return (
    <>
      <Button
        primary
        onClick={() =>
          AModal.instantiate()
            .then(() => {
              Notification.push('resolve');
            })
            .catch(() => {
              Notification.push('reject');
            })
        }
      >
        打开对话框
      </Button>
    </>
  );
};

const AModal = Modal.createLiteModal(({ close, visible, args, resolve, reject }) => {
  return (
    <Modal title="标题" visible={visible} onClose={close}>
      Content
      <Button onClick={() => resolve()}>Resolve</Button>
      <Button onClick={() => reject(false)}>Reject</Button>
    </Modal>
  );
});

export default BasicUsage;
