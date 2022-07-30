import React, { useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import NavLink from '@docs/components/NavLink';

import logo from '@docs/logo.png';
import { i18nContext, i18nStateContext, Language } from '@docs/utils/i18n';
import { RouteView } from '@docs/utils/RouterView';
import { Button } from '🦄';
import useBreakpoints from '@docs/utils/useBreakpoints';
import './styles.scss';

const Nav: React.FC<{ i18nState: Language; setI18nState: () => void }> = ({
  i18nState,
  setI18nState,
}) => {
  const i18n = useContext(i18nContext);
  const tablet = useBreakpoints('tablet');
  return (
    <header className="doc-nav">
      <div>
        <NavLink className="doc-nav-logo-link" to="/">
          <img src={logo} alt="logo" />
          {tablet ? <h3>Strawberry Farm</h3> : null}
        </NavLink>
        <div>
          <Button textual style={{ width: 120 }} onClick={setI18nState}>
            <sup>文</sup>
            <sub>A</sub>
            <span>&nbsp;&nbsp;&nbsp;{i18nState}</span>
          </Button>
        </div>
      </div>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/docs">Strawberry Farm</NavLink>
      </div>
    </header>
  );
};
const ScrollToTop: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const lastValue = useRef<string>('/');
  if (location.pathname !== lastValue.current) {
    lastValue.current = location.pathname;
    window.scrollTo(0, 0);
  }

  return children as React.ReactElement;
};

const AppLayout: React.FC = () => {
  const [i18nState, setI18nState] = useContext(i18nStateContext);

  return (
    <div className="app-layout">
      <ScrollToTop>
        <Nav
          i18nState={i18nState}
          setI18nState={() => setI18nState(i18nState === 'zh' ? 'en' : 'zh')}
        />
        <RouteView />
      </ScrollToTop>
    </div>
  );
};

export default AppLayout;
