/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import DemoPlayer from '../DemoPlayer';
import gfm from 'remark-gfm';
import directive from 'remark-directive';
import { i18nStateContext } from '@docs/utils/i18n';
import { Link, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import './styles.scss';

const HashHeadingOfSection: React.FC<any> = ({ children }) => {
  const hash = '#' + children[0].props.value;
  const history = useHistory();
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (history.location.hash === hash) {
      ref.current?.scrollIntoView();
      ref.current?.focus();
    }
  }, [hash, history.location.hash]);

  return (
    <>
      <h3>
        <Link to={{ hash }} ref={ref}>
          {children}
        </Link>
      </h3>
    </>
  );
};

const MyReactMarkdown: React.FC<{
  children: string;
  demosMap: Record<
    string,
    {
      demo: any;
      raw: string;
    }
  >;
}> = ({ children, demosMap }) => {
  return (
    <ReactMarkdown
      plugins={[gfm, directive]}
      linkTarget="_blank"
      renderers={{
        heading: props => {
          const { level, children } = props;
          if (level === 3) {
            return <HashHeadingOfSection {...props} />;
          } else {
            return React.createElement('h' + level, null, children);
          }
        },
        containerDirective: props => {
          const { name, attributes, children } = props;

          if (name === 'demo') {
            return (
              <section className="container-directive-markdown-with-demo-section">
                <div className="page-walker-markdown">{children}</div>
                <DemoPlayer src={demosMap[[...Object.keys(attributes)][0]]} />
              </section>
            );
          }

          return <div className={clsx(`container-directive-${name}`)}>{children}</div>;
        },
        textDirective: props => {
          const { name, attributes, children } = props;

          return <span className={clsx(`text-directive-${name}`)}>{children}</span>;
        },
        leafDirective: props => {
          const { name, attributes, children } = props;

          if (name === 'demo') {
            return <DemoPlayer src={demosMap[[...Object.keys(attributes)][0]]} />;
          }
          return <span className={clsx(`leaf-directive-${name}`)}>{children}</span>;
        },
      }}
      className="page-walker-markdown"
    >
      {children}
    </ReactMarkdown>
  );
};

const PageWalker: React.FC<{ requireDemo: any; requireRaw: any; requireMd: any }> = ({
  requireDemo,
  requireRaw,
  requireMd,
}) => {
  const [i18nState] = useContext(i18nStateContext);
  const demosMap = Object.keys(requireDemo).reduce((map, _key) => {
    const key = _key.split('/').slice(-1)[0].split('.')[0]; // _key === 'bla/bla/basicDemo.tsx'
    return { ...map, [key]: { demo: requireDemo[_key], raw: requireRaw[key] } };
  }, {});

  const article = requireMd[i18nState];

  return (
    <div className="page-walker">
      <MyReactMarkdown demosMap={demosMap}>{article}</MyReactMarkdown>
    </div>
  );
};

export default PageWalker;
