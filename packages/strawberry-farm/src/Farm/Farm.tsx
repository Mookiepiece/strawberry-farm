import React, { useContext, useEffect } from 'react';
import Field from './Field';
import clsx from 'clsx';
import { FarmBagItem, SeedString, SEED_NAME_MAP, FarmContext, useFarm } from './useFramStore';

const Farm: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  useEffect(() => {});

  const farmModel = useFarm();

  const { state, buy } = farmModel;

  return (
    <FarmContext.Provider value={farmModel}>
      <div className="sf-farm">
        <span className="sf-farm__wallet">{state.wallet}</span>
        <span
          className={clsx('sf-farm__store', state.wallet < 100 && 'sf-farm__store--disabled')}
          onClick={() => {
            if (state.wallet >= 100) {
              const m: Record<SeedString, number> = {
                '🍓': 30,
                '🍇': 30,
                '🌽': 30,
                '🍟': 10,
              };

              let s = Math.random() * 100;

              const e = [...Object.entries(m)] as [SeedString, number][];
              let i: typeof e[0] | undefined;
              while ((i = e.shift())) {
                const [seedName, weight] = i;
                if (weight >= s) return buy(seedName);
                s -= weight;
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
      <Bag />
    </FarmContext.Provider>
  );
};

const FieldSet: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="sf-farm-field-set">{children}</div>;
};

const Bag: React.FC = () => {
  const {
    state: { bag, selectedBagItem },
    selectItem,
  } = useContext(FarmContext);
  return (
    <div className="sf-farm-bag">
      {bag.map(bagItem => {
        const { id, type } = bagItem;
        const active = selectedBagItem?.id === id;

        return (
          <div
            className={clsx('st-farm-plant-seed', active && 'st-farm-plant-seed--active')}
            onClick={() => selectItem(bagItem)}
            key={id}
          >
            <div className="st-farm-plant-seed__image">{type}</div>
            <div className="st-farm-plant-seed__title">{SEED_NAME_MAP.get(type)?.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Farm;
