import React, { useLayoutEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import {
  NotificationPortal,
  useEventCallback,
  createPortalChannel,
} from '../utils';
import Collapse from '../Collapse';

type Noti = {
  id: number;
  payload: React.ReactNode | React.ReactNode[];
};

const NotificationItem: React.FC<{ value: Noti; remove: (id: number) => void }> = ({
  value,
  remove,
}) => {
  const [visible, setVisible] = useState([true, false]);
  const mouseLeaveToRemoveRef = useRef<NodeJS.Timeout>();

  const close = useEventCallback(() => {
    setVisible([false, false]);
    setTimeout(() => remove(value.id), 300);
  });

  const handleMouseEnter = useEventCallback(() => {
    mouseLeaveToRemoveRef.current !== undefined && clearTimeout(mouseLeaveToRemoveRef.current);
  });
  const handleMouseLeave = useEventCallback(() => {
    mouseLeaveToRemoveRef.current = setTimeout(() => {
      close();
    }, 3000);
  });

  useLayoutEffect(() => {
    setVisible([true, true]);
    handleMouseLeave();
  }, [handleMouseLeave]);

  return (
    <CSSTransition in={visible[1]} timeout={300} classNames="st-notification-item">
      <Collapse active={visible[0]} className="st-notification-item">
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {value.payload}
        </div>
      </Collapse>
    </CSSTransition>
  );
};

const Notification = createPortalChannel<Noti['payload']>({
  displayName: 'NotificationPortalChannel',
  ConsumerComponent: function NotificationConsumerComponent({ model: [notis, setNotis] }) {
    const remove = useEventCallback((id: number) => {
      setNotis(notis => {
        const index = notis.findIndex(v => v.id === id);
        if (index !== -1) {
          return notis.slice(0, index).concat(notis.slice(index + 1));
        }
        return notis;
      });
    });

    return (
      <NotificationPortal>
        <div>
          {notis.map(value => (
            <NotificationItem key={value.id} value={value} remove={remove} />
          ))}
        </div>
      </NotificationPortal>
    );
  },
});

export default Notification;
