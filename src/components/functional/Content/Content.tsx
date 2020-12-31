import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import {
  Paper,
  makeStyles,
} from '@material-ui/core';

interface Props {
  className?: string,
  children?: JSX.Element,
}

const useStyles = makeStyles(theme => ({
  content: {
    padding: 0,
    marginBottom: 0,
  },
  paper: {
    padding: 15,
    [theme.breakpoints.up('sm')]: {
      padding: 20,
    },
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
    },
  },
}));

const Content: FunctionComponent<Props> = ({ className, children }) => {
  const classes = useStyles();

  return (
    <main className={cn(classes.content, className)}>
      <Paper className={classes.paper}>
        {children}
      </Paper>
    </main>
  );
};

Content.defaultProps = {
  className: '',
  children: null,
};

export default Content;
