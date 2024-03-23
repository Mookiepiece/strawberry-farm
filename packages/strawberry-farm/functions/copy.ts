export function copy(value = '') {
  const _ = document.activeElement;

  const textarea = document.createElement('textarea');
  textarea.value = value;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();

  _ instanceof HTMLElement && _.focus();
}
