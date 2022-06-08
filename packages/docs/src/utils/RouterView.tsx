import React, { useContext, useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

export type DocRoute =
  | {
      path: string;
      exact?: true;
      redirect: string;
    }
  | {
      path: string;
      exact?: true;
      component: React.FC;
      children?: DocRoute[];
    };

const RouterViewContext = React.createContext<DocRoute[]>([]);

const noo: [] = [];

/**
 * NOTE: do not using a react component as RouteView like Vue
 * because Routes should be the children of a Switch, not descendants.
 */
export const RouteView: React.FC<{ routes?: DocRoute[] }> = React.memo(({ routes }) => {
  const _routerViewContextValue = useContext(RouterViewContext);
  const components = useMemo(() => {
    return (routes || _routerViewContextValue).map(route => {
      if ('component' in route) {
        const { component, children, ...rest } = route;

        const C = React.memo(() => {
          return (
            <RouterViewContext.Provider value={children || noo}>
              {React.createElement(component)}
            </RouterViewContext.Provider>
          );
        });

        return {
          /**
           * NOTE: react-router/Route.js:63 -> React.createElement(component, props)
           * because props is changed everytime path changed, so React.memo does nothing on the route component
           * should use render function or create another wrap component to wrap our pages.
           * react-router will also pass a props as the first arg in the render below. but we ignore that because
           * we have react hooks now
           */
          render: () => <C />,
          ...rest,
        };
      }
      return route;
    });
  }, [routes, _routerViewContextValue]);

  return components.length ? (
    <Switch>
      {components.map(route => {
        if ('redirect' in route) {
          const { path, exact, redirect } = route;
          return <Redirect key={path} from={path} exact={exact} to={redirect} />;
        }
        const { path, exact, render } = route;
        return <Route key={path} path={path} exact={exact} render={render} />;
      })}
    </Switch>
  ) : null;
});
