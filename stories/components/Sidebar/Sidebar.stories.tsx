import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Sidebar, { Props } from '@/components/functional/Sidebar/Sidebar';

export default {
  title: 'Sidebar',
  component: Sidebar,
};

const Template: Story<Props> = args => <Sidebar {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  isOpen: true,
  onClose: () => alert('close')
};
