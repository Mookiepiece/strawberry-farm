import React from 'react';
import ReactDOM from 'react-dom/client';
import { zustand } from './zustand';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createPortalChannel = <X,>({
  ConsumerComponent,
  displayName,
}: {
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

  const useStore = zustand<T[]>(() => []);

  const push = (item: T) => useStore.setState(s => [...s, item]);

  const Channel: {
    push: (children: X) => void;
    setup: () => void;
  } = {
    push(payload: X) {
      this.setup();
      push({ id: id++, payload });
    },
    setup() {
      if (!BoxMounted) {
        BoxMounted = true;
        const PortalChannelComponent: React.FC = () => {
          const model = useStore();

          return <ConsumerComponent model={[model, useStore.setState]} />;
        };
        if (displayName) PortalChannelComponent.displayName = displayName;

        const strawberryFarmBlankChannelRoot = document.createElement('div');
        strawberryFarmBlankChannelRoot.style.display = 'none';
        strawberryFarmBlankChannelRoot.classList.add(displayName ?? 'sf-channel');
        document.body.appendChild(strawberryFarmBlankChannelRoot);
        ReactDOM.createRoot(strawberryFarmBlankChannelRoot).render(<PortalChannelComponent />);
      }
    },
  };

  return Channel;
};
