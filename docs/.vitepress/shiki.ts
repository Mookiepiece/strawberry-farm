import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';

const highlighter = createHighlighterCore({
  themes: [
    import('shiki/themes/github-dark.mjs'),
    import('shiki/themes/github-light.mjs'),
  ],
  langs: [
    import('shiki/langs/html.mjs'),
    import('shiki/langs/css.mjs'),
    import('shiki/langs/scss.mjs'),
    import('shiki/langs/javascript.mjs'),
    import('shiki/langs/typescript.mjs'),
    import('shiki/langs/vue.mjs'),
  ],
  engine: createOnigurumaEngine(import('shiki/wasm')),
});

export const highlight = async (
  code: string,
  lang: Parameters<Awaited<typeof highlighter>['codeToHtml']>[1]['lang'],
) =>
  (await highlighter).codeToHtml(code, {
    lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  });
