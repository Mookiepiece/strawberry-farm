import React, { useState } from 'react';
import type { setup } from '.';
import { useMount } from 'react-use';
import ReactDOM from 'react-dom';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createPortalChannel = <X,>({
  ConsumerComponent,
  displayName,
}: {
  portalName: Parameters<typeof setup>[0];
  ConsumerComponent: React.ComponentType<{
    model: [
      { id: number; payload: X }[],
      React.Dispatch<React.SetStateAction<{ id: number; payload: X }[]>>
    ];
  }>;
  displayName?: string;
}) => {
  type T = { id: number; payload: X };

  let id = 0;
  let BoxMounted = false;
  const cache: T[] = [];

  let _push: (v: T) => void = v => {
    cache.push(v);
  };

  const Channel: {
    push: (children: X) => void;
    setup: () => void;
  } = {
    push(payload: X) {
      this.setup();
      _push({
        id: id++,
        payload,
      });
    },
    setup() {
      if (!BoxMounted) {
        BoxMounted = true;
        const PortalChannelComponent: React.FC = () => {
          const model = useState<T[]>([]);
          const [, setItems] = model;
          useMount(() => {
            setItems(cache);
            _push = v => setItems(a => [...a, v]);
          });

          return <ConsumerComponent model={model} />;
        };
        if (displayName) PortalChannelComponent.displayName = displayName;

        const starfallBlankChannelRoot = document.createElement('div');
        starfallBlankChannelRoot.style.display = 'none';
        starfallBlankChannelRoot.classList.add(displayName ?? 'st-channel');
        document.body.appendChild(starfallBlankChannelRoot);
        ReactDOM.render(<PortalChannelComponent />, starfallBlankChannelRoot);
      }
    },
  };

  return Channel;
};
