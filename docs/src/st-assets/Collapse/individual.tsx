import React, { useState } from 'react';
import { Button, Collapse } from 'starfall';

const Individual: React.FC = () => {
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  return (
    <>
      <div>{active ? '👴' : '🎅'}</div>
      <Button onClick={() => setActive(!active)}>toggle</Button>
      <Collapse.Panel active={active}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis unde nesciunt
          laudantium quidem sint, suscipit sit facere quos dolor. Iure omnis aspernatur magni
          laudantium rerum enim quam placeat libero voluptate.
        </p>
        <Button onClick={() => setActive(!active)}>toggle</Button>
        <Button onClick={() => setActive2(!active2)}>inner toggle2</Button>
        <Collapse.Panel active={active2}>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur libero facilis
            architecto? Sunt, delectus mollitia quaerat ad ut laboriosam enim quis perspiciatis
            culpa beatae! Veritatis odio consequuntur iure magnam esse!
          </p>
          <div style={{ height: 20, marginBottom: 100, background: 'aliceblue' }}>
            <div style={{ height: 10, marginBottom: -90, background: 'pink' }}></div>
          </div>
        </Collapse.Panel>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur libero facilis
          architecto? Sunt, delectus mollitia quaerat ad ut laboriosam enim quis perspiciatis culpa
          beatae! Veritatis odio consequuntur iure magnam esse!
        </p>
      </Collapse.Panel>
    </>
  );
};

export default Individual;
