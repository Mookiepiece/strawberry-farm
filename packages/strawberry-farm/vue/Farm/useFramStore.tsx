import React, { useCallback, useState } from 'react';
export type SeedString = '🍓' | '🍇' | '🌽' | '🍟';

export const SEED_NAME_MAP = new Map<string, { name: string; value: number }>([
  ['🍓', { name: '草莓', value: 200 }],
  ['🍇', { name: '葡萄', value: 100 }],
  ['🌽', { name: '玉米', value: 50 }],
  ['🍟', { name: '薯条', value: 300 }],
]);

export type FarmBagItem = {
  id: number;
  type: SeedString;
};

export type FarmState = {
  selectedBagItem: FarmBagItem | null;
  bag: FarmBagItem[];
  wallet: number;
};

let seed = 0;
const uuid = (): number => seed++;
export const FarmContext = React.createContext<ReturnType<typeof useFarm>>(void 0 as any);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useFarm = () => {
  const [state, setState] = useState<FarmState>({
    selectedBagItem: null,
    bag: [
      {
        id: uuid(),
        type: '🍓',
      },
      {
        id: uuid(),
        type: '🍓',
      },
    ],
    wallet: 300,
  });

  const selectItem = useCallback((item: FarmBagItem) => {
    setState(state => ({
      ...state,
      selectedBagItem: state.selectedBagItem?.id === item.id ? null : item,
    }));
  }, []);

  const buy = useCallback((type: SeedString) => {
    setState(state => ({
      ...state,
      bag: [
        ...state.bag,
        {
          id: uuid(),
          type,
        },
      ],
      wallet: state.wallet - 100,
    }));
  }, []);

  const harvest = useCallback((item: FarmBagItem) => {
    setState(state => ({
      ...state,
      wallet: state.wallet + SEED_NAME_MAP.get(item.type)!.value,
    }));
  }, []);

  const plant = useCallback(() => {
    setState(state => ({
      ...state,
      selectedBagItem: null,
      bag: state.bag.filter(i => state.selectedBagItem?.id !== i.id),
    }));
  }, []);

  return {
    state,
    selectItem,
    buy,
    harvest,
    plant,
  };
};
