import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { END } from 'redux-saga';
import type {
  AppProps as NextAppProps,
  AppContext as NextAppContext,
} from 'next/app';
import getConfig from 'next/config';

import Layout, { Props as layoutPropsType } from '@/components/functional/Layout/Layout';
import theme from '@/theme';
import { wrapper } from '@/store';
import '@/styles/styles.scss';
import { loadData } from '@/store/app/app.actions';
import { userTierSelector, sessionSelector, avatarSelector } from '@/store/app/app.selectors';
export interface MyAppProps extends NextAppProps {
  layoutProps?: layoutPropsType,
}

const App = ({ Component, pageProps, layoutProps }: MyAppProps) => {

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

App.defaultProps = {
  Component: () => null,
};

App.getInitialProps = async ({ Component, ctx }: NextAppContext) => {
  const { store, query: { slug = '', post = '' }, req } = ctx;
  if(req) store.dispatch(loadData(req));
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  store.dispatch(END);
  await (store as any).sagaTask.toPromise();

  const { publicRuntimeConfig: { title, description, sections: _sections, seo } } = getConfig();
  const isUserLoggedIn = !!sessionSelector(store.getState());
  const isUserPremium = !!userTierSelector(store.getState());
  const index = Object.keys(_sections).indexOf(slug.toString());
  const sections = Object.values(_sections);
  const avatarUrl = avatarSelector(store.getState());

  const getTitle = () => {
    if (slug && post) {
      const { title: seoTitle } = _sections[slug.toString()].links.find(link => link.route === `/${slug}/${post}`);
      return `${seoTitle} | ${seo.title}`;
    } else if (slug) {
      const { title: seoTitle } = _sections[slug.toString()];
      return `${seoTitle} | ${seo.title}`;
    }
    return seo.title;
  };

  return {
    pageProps,
    layoutProps: {
      sections: Object.values(sections),
      navbarProps: {
        isUserLoggedIn,
        isUserPremium,
        title,
        description,
        loginRedirectUrl: `${slug ? `/${slug}` : '/'}${post ? `/${post}` : ''}`,
        avatarUrl,
      },
      sidebarProps: {
        title,
      },
      sidebarContentProps: {
        isUserLoggedIn,
        isUserPremium,
        sections,
      },
      bottomBarProps: {
        value: index,
        list: sections,
        showLabels: false,
      },
      seoProps: {
        ...seo,
        ogUrl: `${seo.domain}${slug ? `/${slug}` : '/'}${post ? `/${post}` : ''}`,
        title: getTitle(),
      },
    },
  };
};

export default wrapper.withRedux(App);
