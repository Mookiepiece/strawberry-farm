import { inc } from './inc';

const uuid = inc('__!!%%$$##@@SFCreatedModal');

const c = () => {
  const r = document.createElement('sf-modal');

  r.id = uuid();

  return {
    id: r.id,
    mount: () => {
      document.body.appendChild(r);
    },
  };
};
