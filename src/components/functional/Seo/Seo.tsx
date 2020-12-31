import React, { FunctionComponent } from 'react';
import Head from 'next/head';

import theme from '@/theme';

export interface Props {
  author?: string,
  description?: string,
  domain?: string,
  gtmId?: string,
  keywords?: string,
  ogImage?: string,
  ogImageAlt?: string,
  ogSiteName?: string,
  ogType?: string,
  ogUrl?: string,
  title?: string,
  org?: string,
  orgImage?: string,
}

const Seo: FunctionComponent<Props> = ({
  author,
  description,
  domain,
  gtmId,
  keywords,
  ogImage,
  ogImageAlt,
  ogSiteName,
  ogType,
  ogUrl,
  title,
  org,
  orgImage,
}) => {
  return (<Head>
    <title>{title}</title>
    <meta charSet='UTF-8' />
    <meta name='theme-color' content={theme.palette.primary.main} />
    <meta name='author' content={author} />
    <meta name='keywords' content={keywords} />
    <meta name='description' content={description} />
    <meta property='og:site_name' content={ogSiteName} />
    <meta property='og:title' content={title} />
    <meta property='og:description' content={description} />
    <meta property='og:url' content={ogUrl} />
    <meta property='og:image' content={ogImage} />
    <meta property='og:image:alt' content={ogImageAlt} />
    <meta property='og:type' content={ogType} />
    <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' />
    <meta name='robots' content='index,follow' />
    <meta name='node-env' content={process.env.NODE_ENV} />
    <link rel='icon' href='/img/favicon.ico' />
    <link rel='apple-touch-icon' href='/img/icon-192.png' />
    <link rel='canonical' href={ogUrl} />
    <link rel='manifest' href='/static/manifest.json' />
    <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = [{ event: 'gtm.js', 'gtm.start': new Date().getTime() }]` }}></script>
    {process.env.NODE_ENV === 'production' && gtmId && <script async src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}></script>}
    <script type='application/ld+json' dangerouslySetInnerHTML={{
      __html: `{
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${ogUrl}"
        },
        "headline": "${title}",
        "image": [
          "${domain}/icon-256.jpg",
          "${domain}/og_image.jpg"
        ],
        "author": {
          "@type": "Person",
          "name": "${author}"
        },
        "datePublished": "2021-01-01T08:00:00+08:00",
        "dateModified": "2021-01-01T08:00:00+08:00",
        "publisher": {
          "@type": "Organization",
          "name": "${org}",
          "logo": {
            "@type": "ImageObject",
            "url": "${orgImage}"
          }
        }
      }`,
    }}></script>
  </Head>);
};

Seo.defaultProps = {
};

export default Seo;
