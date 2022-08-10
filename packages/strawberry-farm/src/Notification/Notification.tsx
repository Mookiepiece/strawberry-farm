import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { NotificationPortal, useEventCallback, createPortalChannel } from '../shared';
import clsx from 'clsx';

type Noti = {
  id: number;
  payload: {
    content: React.ReactNode;
    el: HTMLDivElement | null;
    offset: number;
    leaving: boolean;
  };
};

const NotificationItem: React.ForwardRefExoticComponent<
  { value: Noti; remove: (id: number) => void } & React.RefAttributes<HTMLDivElement>
> = React.forwardRef(({ value, remove }, ref) => {
  const ourRef = useRef<HTMLDivElement | null>(null);

  const mouseLeaveToRemoveRef = useRef<ReturnType<typeof setTimeout>>();

  const stopTimer = useEventCallback(() => {
    mouseLeaveToRemoveRef.current !== undefined && clearTimeout(mouseLeaveToRemoveRef.current);
  });
  const startTimer = useEventCallback(() => {
    mouseLeaveToRemoveRef.current = setTimeout(() => {
      remove(value.id);
    }, 3000);
  });

  useLayoutEffect(() => {
    startTimer();
  }, [startTimer]);

  console.log(value.payload.offset);
  return (
    <div
      className="sf-notification-item"
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
      style={
        {
          '--y': value.payload.offset + 'px',
        } as any
      }
      ref={useEventCallback((el: HTMLDivElement) => {
        ref ? (typeof ref === 'function' ? ref(el) : (ref.current = el)) : void 0;
        ourRef.current = el;
      })}
    >
      <div
        className={clsx(
          'sf-notification-item__content',
          value.payload.leaving
            ? 'sf-notification-item__content-out'
            : 'sf-notification-item__content-in'
        )}
      >
        {value.payload.content}
      </div>
    </div>
  );
});

const NotificationInner = createPortalChannel<Noti['payload']>({
  displayName: 'NotificationPortalChannel',
  ConsumerComponent: function NotificationConsumerComponent({ model: [notis, setNotis] }) {
    const remove = useCallback(
      (id: number) => {
        setNotis(notis => {
          const index = notis.findIndex(v => v.id === id);
          if (index !== -1) {
            return [
              ...notis.slice(0, index),
              {
                ...notis[index],
                payload: {
                  ...notis[index].payload,
                  leaving: true,
                },
              },
              ...notis.slice(index + 1),
            ];
          }
          return notis;
        });
        setTimeout(() => {
          setNotis(notis => {
            const index = notis.findIndex(v => v.id === id);
            if (index !== -1) {
              return [...notis.slice(0, index), ...notis.slice(index + 1)];
            }
            return notis;
          });
        }, 300);
      },
      [setNotis]
    );

    const offsets = notis.map((noti, index) => {
      return notis
        .slice(index + 1)
        .reduce((a, b) => a + (b.payload.leaving ? 0 : b.payload.offset), 0);
    });
    console.log(offsets[0], notis[0]?.payload.offset, notis[0]?.payload.leaving);

    return (
      <NotificationPortal>
        <div>
          {notis.map((value, index) => (
            <NotificationItem
              ref={(el: HTMLDivElement | null) =>
                el &&
                (setNotis(notis => [
                  ...notis.slice(0, index),
                  {
                    ...notis[index],
                    payload: {
                      ...notis[index].payload,
                      el,
                      offset: el.clientHeight,
                    },
                  },
                  ...notis.slice(index + 1),
                ]),
                console.log(el, el.clientHeight))
              }
              key={value.id}
              value={{ ...value, payload: { ...value.payload, offset: offsets[index] } }}
              remove={remove}
            />
          ))}
        </div>
      </NotificationPortal>
    );
  },
});

const Notification = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  push(content: React.ReactNode) {
    NotificationInner.push({
      content,
      leaving: false,
      offset: 0,
      el: null,
    });
  },
};

export default Notification;
