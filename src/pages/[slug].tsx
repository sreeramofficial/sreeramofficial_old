import React from 'react';
import getConfig from 'next/config';

const Index= ({ img }) => {
  return (
    <img className='img img--center' title='blog' loading='lazy' alt='blog' src={img} height='200' width='375' />
  );
};

Index.defaultProps = {
  img: '',
};

/* istanbul ignore next */
export const getServerSideProps = ({ query, query: { slug } }) => {
  const { publicRuntimeConfig: { sections } } = getConfig();

  return {
    props: {
      img: sections[slug].img,
    },
  };
};

export default Index;
