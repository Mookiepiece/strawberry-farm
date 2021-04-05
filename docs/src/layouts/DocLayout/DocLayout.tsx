import clsx from 'clsx';
import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'starfall';
import { i18nContext, I18nKeys } from '🦌/utils/i18n';
import { DocRoute, RouteView } from '🦌/utils/RouterView';
import './styles.scss';

const SideBar: React.FC<{
  nav: Record<string, I18nKeys>;
}> = ({ nav }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const i18n = useContext(i18nContext);

  return (
    <>
      <aside className={clsx('doc-aside', sidebarExpanded && 'doc-aside--expanded')}>
        {Object.entries(nav).map(([k, v]) => (
          <div key={k}>
            <NavLink className="button-link" to={k}>
              {i18n[v]}
            </NavLink>
          </div>
        ))}
      </aside>
      <Button textual onClick={() => setSidebarExpanded(v => !v)}>
        <div
          style={{ background: 'currentColor', width: 20, height: 2, boxShadow: '0 5px, 0 -5px' }}
        ></div>
      </Button>
    </>
  );
};

const DocLayout: React.FC<{
  children: DocRoute[];
  nav: Record<string, I18nKeys>;
}> = ({ nav, children }) => {
  return (
    <main className="doc-layout">
      <SideBar nav={nav} />
      <div className="doc-content">
        <article>
          <RouteView routes={children} />
        </article>
      </div>
    </main>
  );
};

export default DocLayout;
