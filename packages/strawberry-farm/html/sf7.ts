export const sf7 = <T extends keyof HTMLElementTagNameMap>(
  name: T,
  props?: { class: string; [key: string]: any },
  children?: (string | Node | undefined)[] | string | Node,
) => {
  const el = document.createElement(name);

  if (props) {
    const { class: _class, ...rest } = props;
    el.setAttribute('class', _class);
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
