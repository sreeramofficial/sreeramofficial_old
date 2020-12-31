/* eslint-disable no-magic-numbers */
import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { confetti } from 'dom-confetti';

import styles from './Confetti.styles';

const Confetti = ({ classes }) => {

  useEffect(() => {
    const element = document.querySelector("#confetti");
    confetti(element, {
      elementCount: 300,
    });
  }, []);

  return <div className={classes.confetti}>
    <div id='confetti' className={classes.confettiInner} />
  </div>
};

export default withStyles(styles)(Confetti);
