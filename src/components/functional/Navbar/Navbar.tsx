import React, { useState, FunctionComponent } from 'react';
import {
  AppBar,
  Typography,
  IconButton,
  makeStyles,
  Toolbar,
  Hidden,
  Avatar,
  Menu,
  MenuItem,
} from '@material-ui/core';
import Link from 'next/link';
import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons';
import cn from 'classnames';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  leftBtn: {
    padding: 6,
  },
  titleLeft: {
    flexGrow: 1,
  },
  titlebar: {
    display: 'flex',
    flexGrow: 1,
    cursor: 'pointer',
    justifyContent: 'left',
    alignItems: 'center',
    padding: 4,
  },
  title: {
    display: 'inline',
  },
  description: {
    display: 'inline',
    fontStyle: 'italic',
    marginRight: 6,
  },
  toolbar: {
    minHeight: 56,
    paddingLeft: 10,
    paddingRight: 10,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export interface Props {
  title?: string,
  description?: string,
  onTitlebarClick?: () => void,
  onLeftButtonClick?: () => void,
  isUserLoggedIn?: boolean,
  isUserPremium?: boolean,
  loginRedirectUrl?: string,
  avatarUrl?: string,
}

const Navbar: FunctionComponent<Props> = ({ title, description, onTitlebarClick, onLeftButtonClick, isUserLoggedIn, isUserPremium, loginRedirectUrl, avatarUrl }) => {
  const classes = useStyles();
  const [ anchorEl, setAnchorEl ] = useState(null);

  const onAvatarToggle = e => {
    e.stopPropagation()
    setAnchorEl(!anchorEl ? e.currentTarget : null);
  };

  return (
    <AppBar className={classes.appBar} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <IconButton className={cn('Navbar__leftbutton', classes.leftBtn)} onClick={onLeftButtonClick} aria-hidden>
          <MenuIcon color='secondary' />
        </IconButton>
        <div className={cn('Navbar__titlebar', classes.titlebar)} onClick={onTitlebarClick}>
          <div className={classes.titleLeft}>
            <Hidden smUp>
              <Typography className={classes.title} noWrap variant='h6'>{description}</Typography>
            </Hidden>
            <Hidden xsDown>
              <Typography className={classes.title} noWrap variant='h6'>{title}</Typography>
             &nbsp; | &nbsp;
              <Typography className={classes.description} noWrap variant='caption'>{description}</Typography>
            </Hidden>
          </div>
          <IconButton aria-controls='simple-menu' onClick={onAvatarToggle} aria-hidden>
            {isUserLoggedIn
              ? <Avatar alt='avatar' src={avatarUrl} className={classes.small} />
              : <AccountCircle color={'secondary'} className={classes.small} />}
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={onAvatarToggle}>
              {isUserLoggedIn
                ? <Link href={'/api/auth/logout'}>
                  <MenuItem>Logout</MenuItem>
                </Link>
                : <Link href={`/api/auth/login?redirectTo=${loginRedirectUrl}`}>
                  <MenuItem>Login</MenuItem>
                </Link>}
            </Menu>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

Navbar.defaultProps = {
  title: '',
  description: '',
  onLeftButtonClick: /* istanbul ignore next */ () => null,
  onTitlebarClick: /* istanbul ignore next */ () => null,
  loginRedirectUrl: '/',
};

export default Navbar;
