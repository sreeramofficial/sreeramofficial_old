import React, { useEffect, FunctionComponent } from 'react';
import {
  LinearProgress,
  makeStyles,
} from '@material-ui/core';

import splash from '@/assets/splash.png';

export interface Props {
  onLoad?: () => void,
  duration?: number,
}

const useStyles = makeStyles(theme => ({
  splash: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '-webkit-fill-available',
    width: '100%',
    background: `url(${splash}) center center no-repeat #ffffff`,
    backgroundSize: 'contain',
  },
  linearProgress: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
}));

const Splash: FunctionComponent<Props> = ({ onLoad, duration }) => {

  useEffect(() => {
    const timer = setTimeout(onLoad, duration);
    return () => clearTimeout(timer);
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.splash}>
      <div className={classes.linearProgress}>
        <LinearProgress variant='indeterminate' />
      </div>
    </div>
  );
};

Splash.defaultProps = {
  onLoad: /* istanbul ignore next */ () => null,
  duration: 1000,
};

export default Splash;
