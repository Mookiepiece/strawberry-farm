import React, { useContext, useState } from 'react';
import { FarmBagItem, FarmContext } from './FarmContext';

const Field: React.FC<{
  handleClick: () => FarmBagItem | undefined;
}> = React.memo(({ handleClick }) => {
  const [plant, setPlant] = useState<FarmBagItem | null>(null);
  const [ohhh, setOhhh] = useState(false);

  const { farmMitt } = useContext(FarmContext);

  const inner = plant ? (ohhh ? plant.type : '🌱') : null;

  return (
    <div
      className="sf-field"
      onClick={() => {
        if (plant) {
          if (ohhh) {
            farmMitt.emit('HARVEST', plant);
            setPlant(null);
            setOhhh(false);
          } else {
            void 0;
          }
        } else {
          const selectedItem = handleClick();
          if (selectedItem) {
            farmMitt.emit('PLANT', undefined);
            setPlant(selectedItem);
            setTimeout(() => {
              setOhhh(true);
            }, 3000);
          }
        }
      }}
    >
      <div className="sf-field__inner">{inner}</div>
    </div>
  );
});

export default Field;
