import React, { useEffect, useRef, useState } from 'react';
import { useToggle } from 'react-use';
import { Box, Button, Collapse } from '🦄';
import { useClickAway } from '🦄/shared';

const BasicUsage: React.FC = () => {
  const [button, setButton] = useState<HTMLButtonElement | null>(null);
  const [collapseDiv, setCollapseDiv] = useState<HTMLDivElement | null>(null);

  const [expanded, toggleExpanded] = useToggle(false);

  useClickAway(expanded ? [button, collapseDiv] : [], () => {
    toggleExpanded(false);
  });

  return (
    <>
      <Button ref={setButton} onClick={toggleExpanded}>
        Expand
      </Button>
      <div style={{ width: 'max-content' }}>
        <Collapse ref={setCollapseDiv}>
          {expanded ? (
            <Box horizontal className="p-10" gap={2}>
              <Button>A</Button>
              <Button>B</Button>
              <Button>C</Button>
            </Box>
          ) : null}
        </Collapse>
      </div>
    </>
  );
};

export default BasicUsage;
