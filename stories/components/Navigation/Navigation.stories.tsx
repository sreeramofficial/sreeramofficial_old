import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Navigation, { Props } from '@/components/functional/Navigation/Navigation';

export default {
  title: 'Navigation',
  component: Navigation,
};

const Template: Story<Props> = args => <Navigation {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  next: {
    title: 'next',
    route: '/route',
  },
  prev: {
    title: 'prev',
    route: '/route',
  },
};
