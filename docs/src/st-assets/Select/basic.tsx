import React, { useState } from 'react';
import { Select } from 'starfall';

const BasicUsage: React.FC = () => {
  const [value, setValue] = useState<any>(null);
  return (
    <>
      <Select<number>
        value={value}
        onChange={setValue}
        options={[
          {
            value: 1,
          },
          {
            value: 12,
          },
          {
            value: 31,
          },
        ]}
      />
    </>
  );
};
export default BasicUsage;
