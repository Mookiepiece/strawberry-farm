import { useEffect } from 'react';
import type { RefObject } from 'react';
import { useEventCallback } from '@mookiepiece/starfall-utils';

const useClickAway = <K extends keyof DocumentEventMap = 'click'>(
  _ref:
    | (RefObject<HTMLElement> | HTMLElement | null)[]
    | RefObject<HTMLElement>
    | HTMLElement
    | null,
  callback: (event: DocumentEventMap[K]) => void,
  eventName: K = 'click' as K
): void => {
  const refs = ((Array.isArray(_ref) ? [..._ref] : [_ref]).filter(Boolean) as (
    | RefObject<HTMLElement>
    | HTMLElement
  )[])
    .map(el => ('current' in el ? el.current : el))
    .filter(Boolean) as HTMLElement[];

  const handler = useEventCallback((event: DocumentEventMap[K]) => {
    const { target } = event;
    if (target instanceof Element) {
      if (refs.every(el => !el.contains(target))) callback(event);
    }
  });

  useEffect(() => {
    if (refs.length) {
      document.addEventListener(eventName, handler);
      return () => document.removeEventListener(eventName, handler);
    }
  }, [eventName, handler, refs.length]);
};

export default useClickAway;
