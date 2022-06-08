import clsx from 'clsx';
import React, { useContext, useState } from 'react';
import NavLink from '@docs/components/NavLink';
import { Button } from '🦄';
import { i18nContext, I18nKeys } from '@docs/utils/i18n';
import { RouteView } from '@docs/utils/RouterView';
import './styles.scss';

const SideBar: React.FC<{
  nav: Record<string, Record<string, I18nKeys>>;
}> = ({ nav }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const i18n = useContext(i18nContext);

  return (
    <>
      <aside className={clsx('doc-aside', sidebarExpanded && 'doc-aside--expanded')}>
        {Object.entries(nav).map(([t, c]) => {
          return (
            <dl key={t}>
              <dt>{t}</dt>
              <dd>
                {Object.entries(c).map(([k, v]) => (
                  <div key={k}>
                    <NavLink to={k}>{i18n[v]}</NavLink>
                  </div>
                ))}
              </dd>
            </dl>
          );
        })}
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
  nav: Record<string, Record<string, I18nKeys>>;
}> = ({ nav }) => {
  return (
    <main className="doc-layout">
      <div className="doc-content">
        <article>
          <RouteView />
        </article>
      </div>
      <SideBar nav={nav} />
    </main>
  );
};

export default DocLayout;
