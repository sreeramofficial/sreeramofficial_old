import React, { useState, Fragment, FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';

import Navbar, { Props as navbarPropsType } from '@/components/functional/Navbar/Navbar';
import BottomBar, { Props as bottomBarPropsType, bottomListType } from '@/components/functional/Bottombar/Bottombar';
import Sidebar, { Props as sidebarPropsType } from '@/components/functional/Sidebar/Sidebar';
import SidebarContent, { Props as sidebarContentPropsType } from '@/components/functional/SidebarContent/SidebarContent';
import Seo, { Props as seoPropsType } from '@/components/functional/Seo/Seo';

export interface Props {
  seoProps?: seoPropsType,
  navbarProps?: navbarPropsType,
  sidebarProps?: sidebarPropsType,
  sidebarContentProps?: sidebarContentPropsType,
  bottomBarProps?: bottomBarPropsType,
  children?: JSX.Element,
  index?: number,
  sections?: bottomListType[],
}

const useStyles = makeStyles(() => ({
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    borderTop: 'solid 1px #e4e4e4',
  },
  contentWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  shift: {
    minHeight: 56,
    maxHeight: 56,
  },
}));

const Layout: FunctionComponent<Props> = ({ seoProps, navbarProps, sidebarProps, sidebarContentProps, bottomBarProps, children, sections }) => {
  const classes = useStyles();
  const router = useRouter();
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);

  const onNavbarLeftButtonClick = () => setIsSidebarOpen(true);
  const onNavbarTitlebarClick = () => router.push('/');
  const onSidebarOpen = () => setIsSidebarOpen(true);
  const onSidebarClose = () => setIsSidebarOpen(false);
  const onBottomNavItemChange = val => router.push(sections[val].route);

  return <Fragment>
    <Seo {...seoProps} />
    <Navbar
      {...navbarProps}
      onLeftButtonClick={onNavbarLeftButtonClick}
      onTitlebarClick={onNavbarTitlebarClick} />
    <Sidebar
      {...sidebarProps}
      isOpen={isSidebarOpen}
      onClose={onSidebarClose}
      onOpen={onSidebarOpen}>
      <SidebarContent
        {...sidebarContentProps} />
    </Sidebar>
    <div className={classes.contentWrapper}>
      <div className={classes.shift} />
      {children}
      <div className={classes.shift} />
    </div>
    <BottomBar
      {...bottomBarProps}
      onChange={onBottomNavItemChange}
      className={classes.bottomNav} />
  </Fragment>
};

Layout.defaultProps = {
  children: null,
  index: 0,
  sections: [],
};

export default Layout;
