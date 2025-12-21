import type { Meta, StoryObj } from '@storybook/web-components';
import './my-button';

const meta: Meta = {
  title: 'Components/My Button',
  argTypes: {
    text: {
      control: 'text',
      description: 'Texto do botão',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Variação de cor',
    },
    greeting: {
      action: 'greeting',
      description: 'Evento custom disparado no click',
    },
  },
};

export default meta;

type Story = StoryObj<{
  text?: string;
  color?: 'primary' | 'secondary' | 'tertiary';
}>;

export const Playground: Story = {
  args: {
    text: 'Click me',
    color: 'primary',
  },
  render: (args) => {
    const el = document.createElement('my-button');

    if (args.text) {
      el.setAttribute('text', args.text);
    }

    if (args.color) {
      el.setAttribute('color', args.color);
    }

    el.addEventListener('greeting', (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string }>;
      console.log(customEvent.detail);
    });

    return el;
  },
};
