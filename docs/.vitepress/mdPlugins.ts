import MarkdownIt from 'markdown-it';
import mdContainer from 'markdown-it-container';

export const mdPlugin = (md: MarkdownIt) => {
  md.use(mdContainer, 'demo', {
    validate(params: any) {
      return !!params.trim().match(/^demo\s*(.*)$/);
    },

    render(tokens: any, idx: any) {
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const path = tokens[idx].info.trim().split(' ')[1];
        return `<VPDemo path="${path}">
        `;
      } else {
        return '</VPDemo>';
      }
    },
  });
  // md.use(mdContainer, 'src', {
  //   validate(params) {
  //     return !!params.trim().match(/^src\s*(.*)$/);
  //   },

  //   render(tokens, idx) {
  //     if (tokens[idx].nesting === 1 /* means the tag is opening */) {
  //       // if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

  //       return `<div class="language-html vp-code">

  //       <button title="Copy Code" class="copy"></button><span class="lang">html</span>
  //       ${html}
  //       `;
  //     } else {
  //       return '</div>';
  //     }
  //   },
  // });
};
