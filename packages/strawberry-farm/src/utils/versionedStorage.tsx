// import useRequest from './useRequest';

import { SetStateAction, useCallback, useEffect, useMemo } from 'react';
import { useGetSet } from 'react-use';

export type STORAGE_VALUE = {
  meta: {
    version: number;
  };
};

type StorageModel<T extends STORAGE_VALUE> = {
  meta: {
    version: number;
    versionBeforeUpgrade: number | undefined;
  };
  value: T;
  set(t: T): void;
};

export type StorageModelUpgradeFn = Record<string, (legacyValue: any) => any>;

export const versionedStorage = <T extends STORAGE_VALUE>({
  root,
  initialValue,
  version,
  upgradeFn = {},
  storage,
}: {
  root: string;
  initialValue: Omit<T, 'meta'>;
  version: number;
  upgradeFn?: StorageModelUpgradeFn;
  storage: Storage;
}): StorageModel<T> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let _obj: any;

  let versionBeforeUpgrade: number | undefined;

  try {
    _obj = JSON.parse(storage.getItem(root) || 'throws an error');

    if (_obj) {
      if (typeof _obj.meta.version !== 'number' || _obj.meta.version > version) throw new Error();
      versionBeforeUpgrade = _obj.meta.version;

      Object.entries(upgradeFn)
        .filter(([ver]) => Number(ver) < version || Number(ver) > _obj.meta.version)
        .forEach(([, fn]) => {
          _obj = fn(_obj);
        });
    }
  } catch (e) {
    _obj = initialValue;
  }

  const meta = { ..._obj.meta, version };
  let obj: T = { meta, ..._obj };
  storage.setItem(root, JSON.stringify(obj));

  return {
    meta: {
      ...meta,
      versionBeforeUpgrade,
    },
    get value() {
      return obj;
    },
    set(t: T) {
      storage.setItem(root, JSON.stringify((obj = t)));
    },
  };
};

export const useStorage = <T extends STORAGE_VALUE>(
  storageModel: StorageModel<T>
): [T, React.Dispatch<React.SetStateAction<T>>, () => T] => {
  const [get, _set] = useGetSet(storageModel.value);
  const v = get();

  const set = useCallback(
    (A: React.SetStateAction<T>) => {
      if (typeof A === 'function') {
        storageModel.set(A(storageModel.value));
      } else {
        storageModel.set(A);
      }
      _set(storageModel.value);
    },
    [_set, storageModel]
  );

  useEffect(() => {
    storageModel.set(v);
  }, [storageModel, v]);

  return useMemo(() => [get(), set, get], [get, set]);
};
