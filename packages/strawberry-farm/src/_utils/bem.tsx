import clsx, { ClassValue } from 'clsx';

export const bem = (
  block: string,
  modifiers: Record<string, string | boolean | null | undefined>
): ClassValue => {
  return clsx(
    block,
    Object.fromEntries(Object.entries(modifiers).map(([k, v]) => [block + '--' + k, v]))
  );
};
