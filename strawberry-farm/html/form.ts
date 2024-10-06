export const requestSubmit = (el: Element) => {
  const form = el.closest('form');
  if (!form) return;

  if (
    [...form.querySelectorAll(':is(input,button)[type="submit"]')].every(btn =>
      btn.hasAttribute('disabled'),
    )
  )
    return;

  form?.requestSubmit();
};
