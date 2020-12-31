import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Splash, { Props } from '@/components/functional/Splash/Splash';

export default {
  title: 'Splash',
  component: Splash,
};

const Template: Story<Props> = args => <Splash {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {};
