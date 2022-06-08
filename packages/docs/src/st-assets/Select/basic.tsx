import React, { useState } from 'react';
import { Select } from '🦄';

const options = [
  {
    value: 1,
  },
  {
    value: 12,
  },
  {
    value: 31,
  },
  {
    value: 311,
  },
  {
    value: 231,
  },
  {
    value: 321,
  },
  {
    value: 3331,
  },
  {
    value: 3431,
  },
  {
    value: 3117,
  },
  {
    value: 3231,
  },
];

const BasicUsage: React.FC = () => {
  const [value, setValue] = useState<any>(null);
  const [value2, setValue2] = useState<any>(null);
  return (
    <>
      <div style={{ maxWidth: 240 }}>
        <Select<number> filterable value={value} onChange={setValue} options={options} />
      </div>
      <div style={{ maxWidth: 240 }}>
        <Select<number> value={value2} onChange={setValue2} options={options} />
      </div>
    </>
  );
};
export default BasicUsage;
