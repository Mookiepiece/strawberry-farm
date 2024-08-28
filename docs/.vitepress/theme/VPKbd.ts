import { IFeatherElement } from '@mookiepiece/strawberry-farm/html/IFeatherElement';

export class VPKbdElement extends HTMLElement {
  static observedAttributes = ['k'];

  connectedCallback() {
    this.draw();
  }
  attributeChangedCallback(name: string) {
    if (name === 'k') this.draw();
  }

  draw() {
    const txt = (this.getAttribute('k') || '')
      .trim()
      .split('+')
      .flatMap((s, index, arr) => (index < arr.length - 1 ? [s, '+'] : s));

    const transform = (s: string) => {
      const kbd = (s: string, className?: string) => {
        const kbd = document.createElement('kbd');
        kbd.append(s);
        className && (kbd.className = className);
        return kbd;
      };
      const feather = (
        i: keyof typeof IFeatherElement.names,
        className?: string,
      ) => {
        const f = document.createElement('i-feather');
        f.setAttribute('i', i);
        className && (f.className = className);
        const kbd = document.createElement('kbd');
        kbd.append(f);
        return kbd;
      };

      switch (s.toLowerCase()) {
        case 'up':
          return feather('arrow-up');
        case 'down':
          return feather('arrow-down');
        case 'left':
          return feather('arrow-left');
        case 'right':
          return feather('arrow-right');
        case 'm0':
          return kbd('', 'm0');
        case 'm1':
          return kbd('', 'm1');
        case '+':
          return '+';
        default:
          return kbd(s);
      }
    };

    console.log(txt);

    this.replaceChildren(...txt.map(transform));
  }
}
