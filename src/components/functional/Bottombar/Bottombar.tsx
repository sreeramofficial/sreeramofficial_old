import React, { FunctionComponent } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';

export type bottomListType = {
  title: string,
  img: string,
  route: string,
  links?: Array<{
    title: string,
    route: string,
  }>,
};

export interface Props {
  className?: string,
  list?: bottomListType[],
  value?: number,
  onChange?: (val) => void,
}

const Bottombar: FunctionComponent<Props> = ({ className, list, value, onChange, ...rest }) => {
  const _onChange = (event, val) => onChange(val);
  const getIcon = (icon, alt) => <img style={{ height: 25, width: 25, borderRadius: '50%' }} alt={alt} src={icon} />;
  const listKeyArr = Object.values(list);

  return listKeyArr.length > 0 && (
    <BottomNavigation
      {...rest}
      value={value}
      onChange={_onChange}
      className={className}>
      {Object.values(list).map((item: bottomListType) => (
        <BottomNavigationAction
          key={item.title}
          label={item.title}
          icon={getIcon(item.img, item.title)}
          style={{ minWidth: 25 }} />
      ))}
    </BottomNavigation>
  );
};

Bottombar.defaultProps = {
  className: '',
  list: [],
  value: 0,
  onChange: /* istanbul ignore next */ () => null,
};

export default Bottombar;
