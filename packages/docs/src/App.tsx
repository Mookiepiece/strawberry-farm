import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { HashRouter as Router, useHistory } from 'react-router-dom';
import { loadLang, i18nContext, i18nStateContext, Language } from './utils/i18n';
import '@docs/styles.scss';
import routes from './routes';
import { RouteView } from '@docs/utils/RouterView';
import { Dialog } from '🦄';
import '🦄/theme/index.scss';

const App: React.FC = () => {
  const [i18nState, setI18nState] = useState<Language>('zh');
  const [i18n, setI18n] = useState(() => loadLang('zh'));

  useEffect(() => {
    setI18n(loadLang(i18nState));
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

const modalPrompts: number[] = [];

Dialog.Mitt.on('REGISTER', id => modalPrompts.push(id));
Dialog.Mitt.on('UNREGISTER', id => modalPrompts.splice(modalPrompts.indexOf(id), 1));

const MyPrompt = () => {
  const history = useHistory();

  useEffect(() => {
    const unlock = history.block((props, action) => {
      if (modalPrompts.length) {
        Dialog.Mitt.emit('SINGAL', {
          id: modalPrompts.splice(modalPrompts.length - 1, 1)[0],
          data: undefined,
        });
        return false;
      }
    });

    return unlock;
  });

  return null;
};

export default App;
