import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Blinkingcursor, { Props } from '@/components/functional/Blinkingcursor/Blinkingcursor';

export default {
  title: 'Blinkingcursor',
  component: Blinkingcursor,
};

const Template: Story<Props> = args => <Blinkingcursor {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {};
