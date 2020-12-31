import React from 'react';
import { makeStyles } from '@material-ui/core';
import getConfig from 'next/config';
import isbot from 'isbot';

import Markdown from '@/components/functional/Markdown/Markdown';
import Content from '@/components/functional/Content/Content';
import Navigation from '@/components/functional/Navigation/Navigation';
import auth0 from '@/lib/auth0';
import { getUserData } from '@/store/app/app.api';

const useStyles = makeStyles(theme => ({
  content: {
    maxWidth: 800,
    [theme.breakpoints.up('sm')]: {
      minWidth: 600,
      margin: 20,
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 800,
      margin: '20px auto',
    },
  },
}));

const Page = ({ content, prevLink, nextLink }) => {
  const classes = useStyles();
  return (
    <Content className={classes.content}>
      <>
        <Markdown>
          {content}
        </Markdown>
        <Navigation prev={prevLink} next={nextLink} />
      </>
    </Content>
  );
};

export default Page;

/* istanbul ignore next */
export const getServerSideProps = async ({ query, query: { slug, post }, req }) => {
  const { publicRuntimeConfig: { sections } } = getConfig();
  const currentLinkIndex = sections[slug].links.findIndex(link => link.route === `/${slug}/${post}`);
  const prevLink = sections[slug].links[currentLinkIndex - 1] || null;
  const nextLink = sections[slug].links[currentLinkIndex + 1] || null;
  const session = await auth0.getSession(req);
  let isUserPremium = false;
  const isBot = isbot(req.headers['user-agent']);

  if (session) isUserPremium = (await getUserData(session.user.sub)).tier;

  const { paid: isPremiumRequired, auth: isAuthRequired } = sections[slug];

  if (isAuthRequired && !session && !isBot) return {
    redirect: {
      destination: `/api/auth/login?redirectTo=/${slug}/${post}`,
      permanent: false,
    },
  };

  if (isPremiumRequired && !isUserPremium && !isBot) return {
    redirect: {
      destination: '/premium',
      permanent: false,
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const content = require(`src/data/${slug}/${post}.md`).default;

  return {
    props: {
      content,
      prevLink,
      nextLink,
    },
  };
};
