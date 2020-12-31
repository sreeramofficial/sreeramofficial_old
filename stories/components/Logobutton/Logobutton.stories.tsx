import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Logobutton, { Props } from '@/components/functional/Logobutton/Logobutton';

export default {
  title: 'Logobutton',
  component: Logobutton,
};

const Template: Story<Props> = args => <Logobutton {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {};
