import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Bottombar, { Props } from '@/components/functional/Bottombar/Bottombar';

export default {
  title: 'Bottombar',
  component: Bottombar,
};

const Template: Story<Props> = args => <Bottombar {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  list: [{
    title: '1',
    route: '/route',
    img: 'https://fakeimg.pl/300/',
  },
  {
    title: '2',
    route: '/route',
    img: 'https://fakeimg.pl/300/',
  }, {
    title: '3',
    route: '/route',
    img: 'https://fakeimg.pl/300/',
  }, {
    title: '4',
    route: '/route',
    img: 'https://fakeimg.pl/300/',
  }],
  value: 1,
  onChange: val => alert(val)
};
