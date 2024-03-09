export const sf7 = <T extends keyof HTMLElementTagNameMap | string>(
  name: T,
  props?: { class?: string; [key: string]: unknown },
  children?: (string | Node | undefined)[] | string | Node,
) => {
  const el = document.createElement(name);

  if (props) {
    const { class: _class, ...rest } = props;
    if (_class) el.setAttribute('class', _class);

    for (const [k, v] of Object.entries(rest)) {
      v && el.setAttribute(k, '' + v);
    }
  }

  if (children) {
    if (Array.isArray(children)) {
      el.append(...(children.filter(Boolean) as Node[]));
    } else {
      el.append(children);
    }
  }

  return el;
};

export const svg7 = (
  name: string,
  attributes?: Record<string, any>,
  ...children: (Node | undefined)[]
) => {
  const el = document.createElementNS('http://www.w3.org/2000/svg', name);
  attributes &&
    Object.entries(attributes).forEach(([k, v]) => el.setAttribute(k, v));
  el.append(...(children.filter(Boolean) as Node[]));
  return el;
};
