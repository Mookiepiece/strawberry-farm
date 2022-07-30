import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Mitt } from '../shared';
import {
  FarmBagItem,
  FarmMitt,
  FarmState,
  FieldRegisterProps,
  SeedString,
  SEED_NAME_MAP,
  FarmContext,
  uuid,
} from './FarmContext';
import Field from './Field';
import clsx from 'clsx';
import { 帚 } from './utils';

const Farm: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  useEffect(() => {});

  const [state, setState] = useState<FarmState>(() => ({
    fields: new Map<number, FieldRegisterProps>(),
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
  }));

  const [farmMitt] = useState(() => {
    const farmMitt = Mitt() as FarmMitt;
    farmMitt.on('SELECT_BAG_ITEM', bagItem =>
      setState(state => ({
        ...state,
        selectedBagItem: state.selectedBagItem?.id === bagItem.id ? null : bagItem,
      }))
    );
    farmMitt.on('PLANT', () =>
      setState(state => ({
        ...state,
        selectedBagItem: null,
        bag: 帚.remove(state.bag, i => state.selectedBagItem?.id === i.id),
      }))
    );

    farmMitt.on('HARVEST', item => {
      setState(state => ({ ...state, wallet: state.wallet + SEED_NAME_MAP.get(item.type)!.value }));
    });
    return farmMitt;
  });

  const farmContextValue = useMemo(
    () => ({
      farmMitt,
    }),
    [farmMitt]
  );

  return (
    <FarmContext.Provider value={farmContextValue}>
      <div className="sf-farm">
        <span className="sf-farm__wallet">{state.wallet}</span>
        <span
          className={clsx('sf-farm__store', state.wallet < 100 && 'sf-farm__store--disabled')}
          onClick={() => {
            if (state.wallet >= 100) {
              const create = (type: SeedString) => {
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
              };

              const m: Record<SeedString, number> = {
                '🍓': 30,
                '🍇': 30,
                '🌽': 30,
                '🍟': 10,
              };

              const s = Math.random() * 100;
              console.log(s);
              const e = [...Object.entries(m)] as [SeedString, number][];
              for (let i = 0; i < e.length; i++) {
                e[i][1] = e[i][1] + (e[i - 1]?.[1] ?? 0);
                if (e[i][1] >= s) {
                  return create(e[i][0]);
                }
              }
            }
          }}
        >
          🎲
        </span>
        <FieldSet>
          {[...Array(9).keys()].map(i => (
            <Field
              key={i}
              handleClick={() => {
                if (state.selectedBagItem) {
                  const v = state.selectedBagItem;
                  return v;
                }
              }}
            ></Field>
          ))}
        </FieldSet>
      </div>
      <Bag selectedBagItem={state.selectedBagItem} bag={state.bag} />
    </FarmContext.Provider>
  );
};

const FieldSet: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="sf-farm-field-set">{children}</div>;
};

const Bag: React.FC<{
  bag: FarmBagItem[];
  selectedBagItem: FarmBagItem | null;
}> = React.memo(({ bag, selectedBagItem }) => {
  return (
    <div className="sf-farm-bag">
      {bag.map(({ id, type }) => (
        <BagItem key={id} id={id} type={type} active={selectedBagItem?.id === id} />
      ))}
    </div>
  );
});

const BagItem: React.FC<{
  id: number;
  type: SeedString;
  active: boolean;
}> = React.memo(({ id, type, active }) => {
  const farmContext = useContext(FarmContext);

  return (
    <div
      className={clsx('st-farm-plant-seed', active && 'st-farm-plant-seed--active')}
      onClick={() => farmContext.farmMitt.emit('SELECT_BAG_ITEM', { id, type })}
    >
      <div className="st-farm-plant-seed__image">{type}</div>
      <div className="st-farm-plant-seed__title">{SEED_NAME_MAP.get(type)?.name}</div>
    </div>
  );
});

export default Farm;
