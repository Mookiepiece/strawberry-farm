/* eslint-disable no-irregular-whitespace */
import React from 'react';

type DialogProps = {
  title: string;
  warning?: boolean;
};
const Dialog: React.FC<DialogProps> & {
  HuTao: React.FC;
  Tank: React.FC;
} = ({ title, children, warning }) => {
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

const HuTao: React.FC = () => {
  return (
    <div style={{ whiteSpace: 'pre' }}>
      {`
。  ____/ L \\___
   ｜       \\ Y /    ｜
 ˡ  ———————— ˡ。
  リ //  ー　ー \\\\   ▍        ————
//  ‖‖　 ✪     ✪ ‖\\\\        /    —       —  \\
  ｜‖\\   　 ▽    /‖         |          ▽         |
   《‖ ＼ 　 イ  ‖》        \\                  /
   》  ／ 「」\\   《   ＜    |            /    ＞
《   /  |   =❈=  \\    》        /       /
川  |   |     =·=    | |   《    /    /
`.trim()}
    </div>
  );
};

const Tank: React.FC = () => {
  return (
    <pre>
      {`
▄▄▄▄▄▄███〓█
　　▂▃▄▅████▅▄▄▄▄●
　　██████████████
　　◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲◤
  `.trim()}
    </pre>
  );
};

Dialog.HuTao = HuTao;
Dialog.Tank = Tank;

export default Dialog;
