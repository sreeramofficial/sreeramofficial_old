import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import { Favorite } from '@material-ui/icons';

import styles from './Blinkingcursor.module.css';

export interface Props {
  className?: string,
}

const Blinkingcursor: FunctionComponent<Props> = ({ className }) => {
  return (
    <Favorite className={cn(styles.Blinkingcursor, className)} />
  );
};

Blinkingcursor.defaultProps = {
  className: '',
};

export default Blinkingcursor;
