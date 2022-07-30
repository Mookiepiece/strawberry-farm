import React, { useEffect, useRef, useState } from 'react';
import { Button } from '🦄';
import { useEventCallback } from '🦄/shared';

const BasicUsage: React.FC = () => {
  const [count, setCount] = useState(0);
  const getCount = useEventCallback(() => {
    setCount(count + 1);
    return count;
  });

  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;
      el.innerText = `Count: ${getCount()}`;
      el.addEventListener('click', () => {
        el.innerText = `Count: ${getCount()}`;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Button ref={buttonRef}></Button>;
};

export default BasicUsage;
