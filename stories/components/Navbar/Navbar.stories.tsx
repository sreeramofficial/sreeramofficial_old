import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Navbar, { Props } from '@/components/functional/Navbar/Navbar';

export default {
  title: 'Navbar',
  component: Navbar,
};

const Template: Story<Props> = args => <Navbar {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {};
