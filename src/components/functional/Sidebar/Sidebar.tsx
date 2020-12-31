import React, { FunctionComponent } from 'react';
import {
  SwipeableDrawer,
  Typography,
  makeStyles,
  Toolbar,
} from '@material-ui/core';

import Logobutton from '@/components/functional/Logobutton/Logobutton';

export interface Props {
  isOpen?: boolean,
  onOpen?: () => void,
  onClose?: () => void,
  title?: string,
  children?: JSX.Element,
}

const useStyles = makeStyles(theme => ({
  paper: {
    width: 285,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  text: {
    padding: 5,
  },
  logoIcon: {
    height: 30,
    width: 30,
    padding: 6,
  },
  toolbarWrapper: {
    borderBottom: 'solid 1px #e4e4e4',
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#ffffff',
  },
  toolbar: {
    minHeight: 56,
    paddingLeft: 10,
    paddingRight: 10,
  },
}));

const Sidebar: FunctionComponent<Props> = ({ children, isOpen, onOpen, onClose, title }) => {
  const classes = useStyles();

  return <SwipeableDrawer
    className='Sidebar'
    variant='temporary'
    swipeAreaWidth={50}
    anchor='left'
    classes={{ paper: classes.paper }}
    open={isOpen}
    onOpen={onOpen}
    onClose={onClose}>
    <div className={classes.toolbarWrapper}>
      <Toolbar className={classes.toolbar}>
        <Logobutton />
        <Typography variant='h6' color='textSecondary' className={classes.text} noWrap>{title}</Typography>
      </Toolbar>
    </div>
    {children}
  </SwipeableDrawer>;
};

Sidebar.defaultProps = {
  children: null,
  isOpen: false,
  title: '',
  onOpen: /* istanbul ignore next */ () => false,
  onClose: /* istanbul ignore next */ () => false,
};

export default Sidebar;
