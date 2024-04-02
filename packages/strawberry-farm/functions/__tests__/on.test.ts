// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest';
import { on } from '../on';

describe('collection', () => {
  describe('on', () => {
    it('on and off event listeners', () => {
      let i = 0;
      const a = document.createElement('a');

      const e = new KeyboardEvent('keydown', {
        key: ' ',
        code: 'Space',
      });

      const off = on(a).keydown['Space'](event => {
        i++;
        expect(event).toEqual(e);
      });

      a.dispatchEvent(e);
      a.dispatchEvent(e);

      expect(i).toBe(2);
      off();

      a.dispatchEvent(e);
      expect(i).toBe(2);
    });

    it('support native key modifiers', () => {
      const i = [0];
      const a = document.createElement('a');
      const span = document.createElement('a');

      a.append(span);

      a.addEventListener('click', () => {
        i.push(1);
      });
      span.addEventListener('click', () => {
        i.push(2);
      });

      on(a).click(() => {
        i.push(3);
      });

      on(a).click.once.capture(() => {
        i.push(4);
      });

      span.click();
      span.click();

      expect(i).toEqual([0, 4, 2, 1, 3, 2, 1, 3]);
    });

    it('support key modifiers', () => {
      let i = 0;
      const a = document.createElement('a');

      on(a).keydown['Enter'](() => (i += 1));
      on(a).keydown['Space'].alt(() => (i += 10));
      on(a).keydown['Space'].ctrl(() => (i += 100));
      on(a).keydown['Space'].exact(() => (i += 1000));

      a.dispatchEvent(
        new KeyboardEvent('keydown', {
          ctrlKey: true,
          key: ' ',
          code: 'Space',
        }),
      );

      expect(i).toBe(100);

      i = 0;
      a.dispatchEvent(
        new KeyboardEvent('keydown', {
          ctrlKey: false,
          key: ' ',
          code: 'Space',
        }),
      );

      expect(i).toBe(1000);
    });
  });
});
