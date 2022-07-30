import React, { useState } from 'react';
import { useRef } from 'react';
import { Button, Popper } from '🦄';

const BasicUsage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  const hideTimer = useRef<NodeJS.Timeout>();

  return (
    <div
      style={{
        display: 'grid',
        gap: 20,
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      }}
    >
      <Popper
        popup={<p>asdsd</p>}
        popupClassName="sf-popper--default"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <Button primary onFocus={() => setVisible(true)} onBlur={() => setVisible(false)}>
          onFocus
        </Button>
      </Popper>
      <Popper
        popup={<p>asdsd asdsd asdsd asdsd</p>}
        popupClassName="sf-popper--default"
        visible={visible2}
        onClose={() => setVisible2(false)}
      >
        <Button primary onClick={() => setVisible2(v => !v)}>
          onClick
        </Button>
      </Popper>
      <Popper
        popup={
          <p
            onMouseEnter={() => {
              hideTimer.current && clearTimeout(hideTimer.current);
              setVisible3(true);
            }}
            onMouseLeave={() => (hideTimer.current = setTimeout(() => setVisible3(false), 200))}
          >
            asds dasd sdasdsd asdsd
          </p>
        }
        popupClassName="sf-popper--default"
        visible={visible3}
        onClose={() => setVisible3(false)}
        closeOnClickOutside={false}
        placement="right"
      >
        <Button
          primary
          onMouseEnter={() => {
            hideTimer.current && clearTimeout(hideTimer.current);
            setVisible3(true);
          }}
          onMouseLeave={() => (hideTimer.current = setTimeout(() => setVisible3(false), 200))}
        >
          onHover
        </Button>
      </Popper>
    </div>
  );
};
export default BasicUsage;
