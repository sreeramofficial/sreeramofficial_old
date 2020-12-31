import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Layout, { Props } from '@/components/functional/Layout/Layout';

export default {
  title: 'Layout',
  component: Layout,
};

const Template: Story<Props> = args => <Layout {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  sections: [
    { 'title': '1', 'route': '/route', 'img': 'https://fakeimg.pl/300/' },
    { 'title': '2', 'route': '/route', 'img': 'https://fakeimg.pl/300/' },
    { 'title': '3', 'route': '/route', 'img': 'https://fakeimg.pl/300/' },
    { 'title': '4', 'route': '/route', 'img': 'https://fakeimg.pl/300/' },
  ],
  links: [
    { 'title': 'Title', 'route': '/route', 'label': 'label' }
  ]
};
