import { useEffect, useState } from 'react';
import { Mitt } from './mitt';
import { useEventCallback } from './useEventCallback';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createComponentInstancesPool = <T extends any>() => {
  let uuid = 1;

  type SingalPayload = T extends undefined
    ? {
        id: number;
        data?: undefined;
      }
    : {
        id: number;
        data: T;
      };

  const CollectorMitt = Mitt<{
    REGISTER: number;
    UNREGISTER: number;
    SINGAL: SingalPayload;
  }>();

  const useCollectComponentInstance = ({
    active,
    listener,
  }: {
    active: boolean;
    listener: T extends undefined ? (data?: undefined) => void : (data: T) => void;
  }) => {
    const [id] = useState(uuid++);
    const _listener = useEventCallback(listener);

    useEffect(() => {
      if (!active) return;

      const off = CollectorMitt.on(
        'SINGAL',
        ((i: SingalPayload) => i.id === id && _listener(i.data)) as any
      );
      CollectorMitt.emit('REGISTER', id);
      return () => {
        off();
        CollectorMitt.emit('UNREGISTER', id);
      };
    }, [id, _listener, active]);
  };

  return { CollectorMitt, useCollectComponentInstance };
};
