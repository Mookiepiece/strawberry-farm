import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { Collapse } from '🦄';
import './styles.scss';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import './prism.css';

const DemoPlayer: React.FC<{
  src: {
    demo: any;
    raw: string;
  };
}> = ({ src: { demo, raw } }) => {
  const LiveDemo = demo.default;
  const [active, setActive] = useState(false);

  const rawHTML = useMemo(() => {
    return Prism.highlight(raw, Prism.languages.tsx, 'tsx');
  }, [raw]);

  return (
    <div className="demo-player">
      <div className="demo-player-inner">
        <div className="demo-live">
          <LiveDemo />
        </div>
        <button
          className={clsx('demo-control', active && 'active')}
          onClick={() => setActive(!active)}
        >
          {'<>'}
        </button>
        <div className="demo-code">
          <Collapse active={active}>
            <pre dangerouslySetInnerHTML={{ __html: rawHTML }} className="language-tsx"></pre>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default DemoPlayer;
