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
        return `<VPDemo path="${path}">`;
      } else {
        return '</VPDemo>';
      }
    },
  });
  md.use(mdContainer, 'source', {
    validate(params: any) {
      return !!params.trim().match(/^source\s*(.*)$/);
    },

    render(tokens: any, idx: any) {
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const path = tokens[idx].info.trim().split(' ')[1];
        return `<VPSource path="${path}">`;
      } else {
        return '</VPSource>';
      }
    },
  });
};
