import { useEffect, useRef, useState } from 'react';

export const useLazyLoading = (
  loading: boolean | undefined,
  lazy: number | undefined
): boolean | undefined => {
  const [innerLoading, setInnerLoading] = useState<boolean | undefined>(false);

  const timeout = useRef<undefined | NodeJS.Timeout>(undefined);

  useEffect(() => {
    if (!lazy) {
      setInnerLoading(loading);
    } else {
      if (loading) {
        timeout.current = setTimeout(() => {
          setInnerLoading(true);
        }, lazy);
      } else {
        if (timeout.current !== undefined) {
          clearTimeout(timeout.current);
        }
        setInnerLoading(false);
      }
    }
  }, [loading, lazy]);

  return innerLoading;
};
