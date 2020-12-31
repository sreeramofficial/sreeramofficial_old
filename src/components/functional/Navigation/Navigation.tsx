import React, { Fragment, FunctionComponent } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  makeStyles,
  Link as _Link,
} from '@material-ui/core';
import Link from 'next/link';
import cn from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {
    clear: 'both',
    background: theme.palette.background.default,
    padding: 8,
    borderRadius: 10,
  },
  leftLink: {
    textAlign: 'left',
    display: 'inline-block',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  rightLink: {
    textAlign: 'right',
    display: 'inline-block',
    textDecoration: 'none',
    cursor: 'pointer',
  },
}));

export interface Props {
  className?: string,
  prev?: linkType,
  next?: linkType,
}

export type linkType = {
  title: string,
  route: string,
};

const Navigation: FunctionComponent<Props> = ({ className, prev, next }) => {
  const classes = useStyles();

  return <Fragment>
    <Stepper activeStep={-1} className={cn(classes.root, className)}>
      <Step>
        <StepLabel icon={null}>
          {prev
            ? <_Link href={prev.route} className={classes.leftLink}>{prev.title}</_Link>
            : <_Link href={'/'}>Home</_Link>
          }
        </StepLabel>
      </Step>
      <Step>
        <StepLabel icon={null}>
          {next
            ? <_Link href={next.route} className={classes.leftLink}>{next.title}</_Link>
            : <_Link href={'/'}>Home</_Link>
          }
        </StepLabel>
      </Step>
    </Stepper>
  </Fragment>
};

Navigation.defaultProps = {
  className: '',
  prev: null,
  next: null,
};

export default Navigation;
