import React, { useContext, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavLink from '@docs/components/NavLink';

import logo from '@docs/strawberry-fury-LOGO.png';
import { i18nContext, i18nStateContext, Language } from '@docs/utils/i18n';
import { DocRoute, RouteView } from '@docs/utils/RouterView';
import { Button } from 'starfall';
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
          {tablet ? <h3>Strawberry Fury</h3> : null}
        </NavLink>
        <div>
          <Button primary style={{ width: 120 }} onClick={setI18nState}>
            <sup>文</sup>
            <sub>A</sub>
            <span>&nbsp;&nbsp;&nbsp;{i18nState}</span>
          </Button>
        </div>
      </div>
      <div>
        <NavLink to="/index">{i18n.NavbarHome}</NavLink>
        <NavLink to="/sf-components">{i18n.NavbarSfComponents}</NavLink>
        <NavLink to="/st-components">{i18n.NavbarStComponents}</NavLink>
      </div>
    </header>
  );
};
const ScrollToTop: React.FC = ({ children }) => {
  const location = useLocation();
  const lastValue = useRef<string>('/');
  if (location.pathname !== lastValue.current) {
    lastValue.current = location.pathname;
    window.scrollTo(0, 0);
  }

  return children as React.ReactElement;
};

const AppLayout: React.FC<{ children: DocRoute[] }> = ({ children }) => {
  const [i18nState, setI18nState] = useContext(i18nStateContext);

  return (
    <ScrollToTop>
      <Nav
        i18nState={i18nState}
        setI18nState={() => setI18nState(i18nState === 'zh' ? 'en' : 'zh')}
      />
      <RouteView routes={children} />
    </ScrollToTop>
  );
};

export default AppLayout;
