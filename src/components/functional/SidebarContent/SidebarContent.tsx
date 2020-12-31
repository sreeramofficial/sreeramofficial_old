import React, { useState, FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse, List, ListItem, ListItemText, ListItemIcon, Link } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { FcLock } from 'react-icons/fc';
import { BiLogIn } from 'react-icons/bi';

const useStyles = makeStyles(() => ({
  links: {
    marginBottom: 6,
  },
  listItem: {
    borderBottom: 'solid 1px #f1f1f1',
  },
  innerListItem: {
    padding: 4,
    paddingLeft: 24,
    borderBottom: 'solid 1px #f1f1f1',
    cursor: 'pointer',
    '&:hover': {
      background: '#f1f1f1',
      textDecoration: 'none',
    },
  },
  listItemText: {
  },
  itemIcon: {
    width: 30,
    height: 30,
    borderRadius: '50%',
  },
}));

export type sidebarLinksType = {
  title?: string,
  img?: string,
  route: string,
  links?: Array<{
    title: string,
    route: string,
  }>,
};

export interface Props {
  sections?: sidebarLinksType[],
  activeSection?: number,
  isUserLoggedIn?: boolean,
  isUserPremium?: boolean,
}

const SidebarContent: FunctionComponent<Props> = ({ sections, isUserLoggedIn, isUserPremium }) => {
  const classes = useStyles();
  return (
    <div className={classes.links}>
      {sections.map(section => <NestedList key={section.title} item={section} isUserLoggedIn={isUserLoggedIn} isUserPremium={isUserPremium} />)}
    </div>
  );
};

SidebarContent.defaultProps = {
  sections: [],
};

export default SidebarContent;

const NestedList = ({ item, isUserLoggedIn, isUserPremium }) => {
  const [ open, setOpen ] = useState(false);
  const classes = useStyles();

  const getSecondary = () => {
    return item.paid && !isUserPremium
      ? 'Premium'
      : item.auth && !isUserLoggedIn
        ? 'Login required'
        : ''
  };

  const getIcon = () => {
    return item.paid && !isUserPremium
      ? <FcLock />
      : item.auth && !isUserLoggedIn
        ? <BiLogIn />
        : null
  };

  const onClick = () => setOpen(!open);

  return <>
    <ListItem className={classes.listItem} button onClick={onClick}>
      <ListItemIcon>
        <img className={classes.itemIcon} src={item.img} />
        {getIcon()}
      </ListItemIcon>
      <ListItemText primary={item.title} secondary={getSecondary()} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={open} timeout='auto' unmountOnExit>
      <List component='div' disablePadding>
        {item.links.map(link => (
          <ListItem key={link.title} className={classes.innerListItem} component={Link} href={link.route}>
            <ListItemText secondary={link.title} className={classes.listItemText} />
          </ListItem>
        ))}
      </List>
    </Collapse>
  </>
};
