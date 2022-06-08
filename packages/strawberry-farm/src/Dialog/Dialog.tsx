/* eslint-disable no-irregular-whitespace */
import React from 'react';

type DialogProps = {
  title: string;
  warning?: boolean;
};
const Dialog: React.FC<DialogProps> = ({ title, children, warning }) => {
  return (
    <div style={{ whiteSpace: 'pre' }}>
      {
        [
          `
／ ￣￣ ＼　
|　ー　ー \\　 ／￣￣￣￣￣￣￣＼
|　 ◉　◉ |   |　   ${title}    \\
\\　　 ▱　/ ∠     ${children}   /
 ＼　　 イ　 \\ ________________/
／　　　\\
/　|　　　 \\
|　|　　　 | |
`.trim(),
          `
／ ￣￣ ＼　
|　乀　√   \\　 ／￣￣￣￣￣￣￣＼
|　 ◉　◉ |   |　   ${title}    \\
\\　  / 皿\\  / ∠    ${children}  /
 ＼　　 イ　 \\ ________________/
／　　　\\
/　|　　　 \\
|　|　　　 | |
`.trim(),
        ][warning ? 1 : 0]
      }
    </div>
  );
};

export default Dialog;
