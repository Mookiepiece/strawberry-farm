import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { HashRouter as Router, useHistory } from 'react-router-dom';
import { getCowboy, i18nContext, i18nStateContext, Language } from './utils/i18n';
import '@docs/styles.scss';
import routes from './routes';
import { RouteView } from '@docs/utils/RouterView';

import '🦄/_theme/index.scss';

const App: React.FC = () => {
  const [i18nState, setI18nState] = useState<Language>('zh');
  const [i18n, setI18n] = useState(() => getCowboy('zh'));

  useEffect(() => {
    setI18n(getCowboy(i18nState));
  }, [i18nState]);

  const i18nStateContextValue = useMemo(() => {
    return [i18nState, setI18nState] as [Language, Dispatch<SetStateAction<Language>>];
  }, [i18nState]);

  return (
    <i18nContext.Provider value={i18n}>
      <i18nStateContext.Provider value={i18nStateContextValue}>
        <Router>
          <RouteView routes={routes} />
          <MyPrompt />
        </Router>
      </i18nStateContext.Provider>
    </i18nContext.Provider>
  );
};

const MyPrompt = () => {
  const history = useHistory();

  // useEffect(() => {
  //   const unlock = history.block((props, action) => {
  //     if (action === 'POP' && Modal.registry.length) {
  //       Modal.Mitt.emit('REMOTE_CLOSE', Modal.registry.slice(-1)[0]);
  //       return false;
  //     }
  //   });

  //   return unlock;
  // });

  return null;
};

export default App;
