import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import clsx from 'clsx';
import { useMount, useUnmount } from 'react-use';

const CollapseContext = React.createContext<{
  names: string[];
  activeNames: string[];
  register: (i?: string) => string;
  unregister: (i: string) => void;
  toggle: (i: string) => void;
}>({
  names: [],
  activeNames: [],
  register: () => '',
  unregister() {},
  toggle() {},
});

const CollapseItemContext = React.createContext<{
  active: boolean;
  name: string;
  toggle: (i: string) => void;
}>({ active: false, toggle() {}, name: '' });

export type CollapseProps = {
  activeNames?: string[];
};

const Collapse: React.FC<CollapseProps> & {
  Panel: React.FC<CollapsePanelProps>;
  Item: React.FC;
  Summary: React.FC<CollapseSummaryProps>;
} = ({ children, activeNames: _activeNames }) => {
  const [names, setNames] = useState<string[]>([]);
  const [activeNames, setActiveNames] = useState<string[]>(_activeNames || []);

  useEffect(() => {
    setActiveNames(_activeNames || []);
  }, [_activeNames]);

  const counter = useRef(0);

  const register = useCallback(
    (name?: string) => {
      if (typeof name === 'string' && names.includes(name)) {
        console.error(`[SF Collapse] duplicated names detected: ${name}`);
        return name;
      } else {
        let i: string;
        do {
          i = (counter.current++).toString();
        } while (names.includes(i));
        setNames(names => [...names, i]);
        return i;
      }
    },
    [names]
  );

  const unregister = useCallback((i: string) => {
    setNames(names => {
      const index = names.findIndex(k => k === i);
      if (index === -1) {
        console.error(`[SF Collapse] invalid name: ${i}`);
      }
      return [...names.slice(0, index), ...names.slice(index + 1)];
    });
    setActiveNames(activeNames => {
      const index = activeNames.findIndex(k => k === i);
      return [...activeNames.slice(0, index), ...activeNames.slice(index + 1)];
    });
  }, []);

  const toggle = useCallback(
    (i: string) => {
      const index = activeNames.findIndex(k => k === i);
      setActiveNames(activeNames =>
        index === -1
          ? [...activeNames, i]
          : [...activeNames.slice(0, index), ...activeNames.slice(index + 1)]
      );
    },
    [activeNames]
  );

  const collapseContextValue = useMemo(
    () => ({
      register,
      unregister,
      names,
      activeNames,
      toggle,
    }),
    [register, unregister, names, activeNames, toggle]
  );

  return (
    <div>
      <CollapseContext.Provider value={collapseContextValue}>{children}</CollapseContext.Provider>
    </div>
  );
};

type CollapsePanelProps = {
  active?: boolean;
};

const CollapsePanel: React.FC<CollapsePanelProps> = ({ children, active: _active }) => {
  const { active: upActive } = useContext(CollapseItemContext);

  const controlled = typeof _active === 'boolean';

  const active = controlled ? _active : upActive;

  const ref = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={active}
      classNames="uuz"
      timeout={{ enter: 300, exit: 300 }}
      onExit={() => {
        if (ref.current) {
          ref.current.style.height = `${ref.current.scrollHeight}px`;
          ref.current?.scrollHeight; // trigger browsers reflow to apply the height.
          // https://github.com/reactjs/react-transition-group/blob/master/src/CSSTransition.js#L193
        }
      }}
    >
      {state => (
        <div
          className="sf-collapse-panel"
          ref={ref}
          style={{
            height: {
              entering: ref.current?.scrollHeight,
              entered: undefined,
              unmounted: undefined,
              exiting: 0,
              exited: 0,
            }[state],
          }}
        >
          {children}
        </div>
      )}
    </CSSTransition>
  );
};

type CollapseSummaryProps = {
  children: React.ReactElement;
};
const CollapseSummary: React.FC<CollapseSummaryProps> = ({ children }) => {
  const { name, active, toggle } = useContext(CollapseItemContext);

  React.Children.only(children);

  return React.cloneElement(children, {
    className: clsx(children.props.className, active ? 'active' : ''),
    onClick: () => toggle(name),
  });
};

type CollapseItemProps = {
  name?: string;
};
const CollapseItem: React.FC<CollapseItemProps> = ({ children, name }) => {
  const { register, unregister, activeNames, toggle } = useContext(CollapseContext);
  const [k, setK] = useState('');

  useMount(() => setK(register(name)));
  useUnmount(() => unregister(k));

  const value = useMemo(
    () => ({
      toggle,
      active: activeNames.includes(k),
      name: k,
    }),
    [activeNames, k, toggle]
  );

  return <CollapseItemContext.Provider value={value}>{children}</CollapseItemContext.Provider>;
};

Collapse.Panel = CollapsePanel;
Collapse.Item = CollapseItem;
Collapse.Summary = CollapseSummary;

export default Collapse;
