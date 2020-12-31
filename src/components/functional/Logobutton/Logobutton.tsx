import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core';
import cn from 'classnames';

import monochrome from '@/assets/monochrome_icon.png';
import dichrome from '@/assets/icon-56.png';

const useStyles = makeStyles(() => ({
  logo: {
    cursor: 'pointer',
    height: 32,
    width: 32,
    padding: 2,
  },
}));

export interface Props {
  className?: string,
  invert?: boolean,
}

const LogoButton: FunctionComponent<Props> = ({ className, invert }) => {
  const classes = useStyles();
  return (
    <img alt='logo' className={cn(className, classes.logo)} src={invert ? monochrome : dichrome} />
  );
};

LogoButton.defaultProps = {
  className: '',
  invert: false,
};

export default LogoButton;
