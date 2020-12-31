import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core';
import Head from 'next/head';
import cn from 'classnames';

const useStyles = makeStyles(() => ({
  root: {
    width: 260,
    overflow: 'hidden',
    borderRadius: 10,
    margin: '20px auto',
  },
  link: {
    color: 'white',
  },
}));

export interface Props {
  className?: string,
}

const LinkedinBadge: FunctionComponent<Props> = ({ className }) => {
  const classes = useStyles();
  return (
    <div className={cn(classes.root, className)}>
      <Head>
        <script type='text/javascript' src='/static/linkedin-profile.js' async defer></script>
      </Head>
      <div className='LI-profile-badge' data-version='v1' data-size='medium' data-locale='en_US' data-type='horizontal' data-theme='light' data-vanity='sreeramofficial'>
        <a className={cn(classes.link, 'LI-simple-link')} href='https://de.linkedin.com/in/sreeramofficial?trk=profile-badge'>Sreeram Padmanabhan</a>
      </div>
    </div>
  );
};

LinkedinBadge.defaultProps = {
  className: '',
};

export default LinkedinBadge;
