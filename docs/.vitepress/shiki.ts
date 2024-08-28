import { codeToHtml } from 'shiki';

// const code = '<div data-type="bar">foo</div>'; // input code
// export const html = await codeToHtml(code, {
//   lang: 'html',
//   themes: {
//     light: 'github-light',
//     dark: 'github-dark',
//   },
// });

export const highlight = (code:string,lang: Parameters<typeof codeToHtml>[1]['lang']) =>
  codeToHtml(code, {
    lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  });
