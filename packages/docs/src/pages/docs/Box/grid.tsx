import React from 'react';
import { Box } from '🦄';

const BasicUsage: React.FC = () => {
  return (
    <>
      <style>{`
    .🎃🎊🧧{
      height: 110px;
      background: var(--color-contrasting-fade-100);
      color: white;
    }
    .🎃🎊🧧 div {
      background: var(--color-contrasting-fade-200);
      border-radius: 3px;
      padding: 5px;
    }
    `}</style>
      <Box grid gap={10}>
        <Box horizontal className="🎃🎊🧧 p-10"justify="evenly">
          <Box grow={0}>1</Box>
          <Box grow={0}>2</Box>
          <Box grow={0}>3</Box>
        </Box>
        <Box horizontal className="🎃🎊🧧 p-10" gap={50} justify="center" align="center">
          <Box grow={0}>1</Box>
          <Box grow={0}>2</Box>
          <Box grow={0} className="ml-auto">
            3
          </Box>
          <Box grow={0}>4</Box>
        </Box>
        <Box horizontal className="🎃🎊🧧 p-10" gap={20} align="start" wrap>
          <Box grow={2}>1</Box>
          <Box>2</Box>
          <Box grow={1}>3</Box>
        </Box>
      </Box>
    </>
  );
};
export default BasicUsage;
