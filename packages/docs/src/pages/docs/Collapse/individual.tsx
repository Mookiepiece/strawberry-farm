import React, { useState } from 'react';
import { Box, Button, Collapse } from '🦄';

const Individual: React.FC = () => {
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  return (
    <>
      <Button onClick={() => setActive(!active)}>{active ? '👴' : '🎅'}</Button>
      <Collapse active={active}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis unde nesciunt
          laudantium quidem sint, suscipit sit facere quos dolor. Iure omnis aspernatur magni
          laudantium rerum enim quam placeat libero voluptate.
        </p>
        <Box className="my-10" gap={10}>
          <Button onClick={() => setActive(!active)}>toggle</Button>
          <Button onClick={() => setActive2(!active2)}>inner toggle2</Button>
        </Box>
        <Collapse>
          {active2 ? (
            <>
              <p style={{ height:100, marginTop: 0, marginBottom: 0 }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur libero facilis
                architecto? Sunt, delectus mollitia quaerat ad ut laboriosam enim quis perspiciatis
                culpa beatae! Veritatis odio consequuntur iure magnam esse!
              </p>
            </>
          ) : null}
        </Collapse>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur libero facilis
          architecto? Sunt, delectus mollitia quaerat ad ut laboriosam enim quis perspiciatis culpa
          beatae! Veritatis odio consequuntur iure magnam esse!
        </p>
      </Collapse>
    </>
  );
};

export default Individual;
