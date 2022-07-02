import React, { useState } from 'react';
import { Box, Button } from '🦄';
import { useSingletonAsyncFn } from '🦄/shared';

const menu = ['🍓', '🍔', '🥐', '🥪', '🍭'];

const query = () => new Promise(r => setTimeout(r, Math.random() * 2000));

const BasicUsage: React.FC = () => {
  const [id, setId] = useState('🥐');

  const [queue, setQueue] = useState<string[]>([]);
  const [queryResult, setQueryResult] = useState<string>(id);

  const [excute, cancel] = useSingletonAsyncFn(async (id: string) => {
    setQueue(q => [...q, ` [ loading (${id}) ] `]);
    await query();
  });

  return (
    <>
      <Button
        onClick={() => {
          const nextId = menu[(menu.indexOf(id) + 1) % menu.length];
          setId(nextId);
          excute(nextId)
            .then(() => {
              setQueue(q => q.slice(1));
              setQueryResult(nextId);
            })
            .catch(alert);
        }}
      >
        I will have order: {id}
      </Button>
      <Button
        textual
        onClick={() => {
          cancel();
          setQueue([]);
        }}
      >
        cancel
      </Button>
      <Box className="my-50">Queue: {queue.join(',')}</Box>
      <Box className="my-50">Your order is: {queryResult}</Box>
    </>
  );
};
export default BasicUsage;
