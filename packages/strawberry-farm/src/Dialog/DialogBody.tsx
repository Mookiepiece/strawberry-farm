/* eslint-disable no-irregular-whitespace */
import React from 'react';
import Box from '../Box';

export type DialogBodyProps = {
  warning?: boolean;
  children?: React.ReactNode;
};

export const DialogBody: React.FC<DialogBodyProps> = ({ warning, children }) => {
  const speaker = (
    <div style={{ whiteSpace: 'pre' }} aria-hidden>
      {
        [
          `
／ ￣￣ ＼
|　ー　ー \\
|　 ◉　◉ |
\\　　 ▱　/
 ＼　　 イ
／　　　\\
/　|　　　 \\
|　|　　　 | |
`.trim(),
          `
／ ￣￣ ＼
|　乀　√  \\
|　 ◉　◉ |
\\　 / 皿\\ /
 ＼　　 イ
／　　　\\
/　|　　　 \\
|　|　　　 | |
`.trim(),
        ][warning ? 1 : 0]
      }
    </div>
  );

  return (
    <Box horizontal gap={20} className="sf-dialog-body" align="start">
      {speaker}
      <div>{children}</div>
    </Box>
  );
};
