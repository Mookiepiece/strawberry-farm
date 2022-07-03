import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button } from '🦄';
import { Mitt } from '🦄/shared';

const fruits = [...'🍎🍏🥭🍓🍒🍐🍑🍌🍋'];

const Demo: React.FC = () => {
  const fooMitt = useMemo(() => {
    const fooMitt = Mitt<{
      GACHA: void;
      ALERT: { a: string };
    }>();

    fooMitt.on('ALERT', event => {
      alert(event.a);
    });

    return fooMitt;
  }, []);

  const [fruit, setFruit] = useState('🍎');
  useEffect(() => {
    return fooMitt.on('GACHA', () =>
      setFruit(fruits.filter(i => i !== fruit)[Math.floor(Math.random() * 7.9)])
    );
  }, [fruit, fooMitt]);

  return (
    <>
      <Button onClick={() => fooMitt.emit('GACHA')}>GACHA</Button>
      <Button onClick={() => fooMitt.emit('ALERT', { a: fruit })}>Alert</Button>

      <style>{`
      @keyframes demo{
        from{
          border: solid 50px pink;
          background: white;
          transform: scale(.6);
        } to {
          border: solid 0px white;
          background: transparent;
          transform: scale(1);
        }
      }`}</style>
      <Box
        key={fruit}
        className="my-50"
        align="center"
        style={{
          position: 'relative',
          width: 100,
          height: 100,
          fontSize: 60,
          textAlign: 'center',
          border: '1px dashed var(--color-dark-fade-100)',
        }}
      >
        {fruit}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderRadius: 999,
            animation: 'demo 1s forwards 1 var(--bezier-ea)',
          }}
        ></div>
      </Box>
    </>
  );
};

export default Demo;
