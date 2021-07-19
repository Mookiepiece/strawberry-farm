import React, { useState } from 'react';
import { Slider } from 'starfall';

const BasicUsage: React.FC = () => {
  const [state, setState] = useState(0);
  const [state2, setState2] = useState(10);
  const [state3, setState3] = useState(101);
  const [state4, setState4] = useState(101);
  return (
    <>
      <div style={{ padding: 40 }}>
        <Slider value={state} onChange={setState} />
      </div>
      <div style={{ padding: 40 }}>
        <Slider
          value={state2}
          onChange={setState2}
          min={10}
          max={20}
          step={2}
          label={[
            {
              value: 14,
            },
          ]}
        />
      </div>
      <div style={{ padding: 40 }}>
        <Slider
          value={state3}
          onChange={setState3}
          min={101}
          max={201}
          step={2}
          label={[
            {
              value: 114,
            },
          ]}
        />
      </div>{' '}
      <div style={{ padding: 40 }}>
        <Slider
          value={state4}
          onChange={setState4}
          min={101}
          max={201}
          step={null}
          label={[
            {
              value: 101,
            },
            {
              value: 114,
            },
            {
              value: 133,
            },
            {
              value: 201,
            },
          ]}
        />
      </div>
    </>
  );
};
export default BasicUsage;
