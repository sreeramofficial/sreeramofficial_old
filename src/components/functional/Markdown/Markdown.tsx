import React, { FunctionComponent } from 'react';
import ReactMarkdown, { ReactMarkdownProps as MarkdownProps } from 'react-markdown';
import {
  Typography,
  Link,
  makeStyles,
} from '@material-ui/core';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const useStyles = makeStyles(theme => ({
  li: {
    // eslint-disable-next-line no-magic-numbers
    marginTop: theme.spacing(1),
  },
  p: {
    fontWeight: theme.typography.fontWeightLight,
    textAlign: 'justify',
  },
}));

const renderers = {
  code: ({ language, value }) => {

    return <SyntaxHighlighter style={theme} language={language} showLineNumbers={false} customStyle={{ fontSize: 12 }}>{value}</SyntaxHighlighter>
  },
  link: ({ href, children }) => {
    return <Link href={href}>{children}</Link>
  },
  heading: ({ children, level }) => {

    const getComponent = level => {
      switch (level) {
        case 1:
          return 'h1';
        case 2:
          return 'h2';
        case 3:
          return 'h3';
        case 4:
          return 'span';
      }
    };

    const getVariant = level => {
      switch (level) {
        case 1:
          return 'h5';
        case 2:
          return 'h6';
        case 3:
          return 'subtitle1';
        case 4 :
          return 'caption';
      }
    };

    return <Typography component={getComponent(level)} variant={getVariant(level)} gutterBottom>{children}</Typography>
  },
  paragraph: ({ children }) => {
    const classes = useStyles();
    return <Typography classes={{ body2: classes.p }} component='p' variant='body2' paragraph>{children}</Typography>
  },
  span: ({ children }) => {
    const classes = useStyles();
    return <Typography classes={{ body2: classes.p }} component='span' variant='body2' paragraph>{children}</Typography>;
  },
  listItem: ({ children }) => {
    const classes = useStyles();
    return (
      <li className={classes.li}>
        <Typography component='span'>{children}</Typography>;
      </li>
    );
  },
};

const Markdown: FunctionComponent<MarkdownProps> = ({ children }) => {
  return <ReactMarkdown renderers={renderers} allowDangerousHtml>{children}</ReactMarkdown>
};

export default Markdown;
