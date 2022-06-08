import React from 'react';
import { Box } from '🦄';

const BasicUsage: React.FC = () => {
  return (
    <>
      <style>{`
    .🎃🎊🧧🧵{
      width: 100px;
      height: 100px;
      box-sizing: border-box;
      background: var(--color-dark-fade-100);
      color:  var(--color-dark);
    }
    .🎃🎊🧧🧵 div {
      color: white;
      height: 50px;
      background: var(--color-dark-fade-200);
      border-radius: 3px;
      padding: 2px 5px;
    }

    `}</style>
      <Box
        style={{
          display: 'grid',
          gap: 5,
          gridTemplateColumns: 'repeat(auto-fit, 100px)',
        }}
      >
        <Box className="🎃🎊🧧🧵">
          <Box>default</Box>
        </Box>
        <Box className="🎃🎊🧧🧵 pr-10">
          <Box>pr-10</Box>
        </Box>
        <Box className="🎃🎊🧧🧵 px-10">
          <Box>px-10</Box>
        </Box>
        <Box className="🎃🎊🧧🧵 pt-10">
          <Box>pt-10</Box>
        </Box>
        <Box className="🎃🎊🧧🧵 py-10">
          <Box>py-10</Box>
        </Box>
        <Box className="🎃🎊🧧🧵">
          <Box className="mr-10"></Box> mr-10
        </Box>
        <Box className="🎃🎊🧧🧵">
          <Box className="mx-10"></Box> mr-10
        </Box>
        <Box className="🎃🎊🧧🧵">
          <Box className="mx-auto" style={{ width: 30 }}></Box> mx-auto
        </Box>
      </Box>
    </>
  );
};
export default BasicUsage;
