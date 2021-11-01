import React from 'react';
import { Story, Meta } from '@storybook/react';
import Button, { ButtonProps } from '../components/Button';

export default {
  title: 'Button',
  component: Button,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    loading: {
      options: [true, false],
      control: { type: 'inline-radio' },
      description: 'Displays an animated loading svg',
      table: {
        type: {
          detail:
            'Optional prop indicating when to display a loading graphic. As this graphic is an svg, its styles can be overridden by targeting svgs within the button. When loading is on, the button is also disabled (but styles are preserved), and the aria-label is updated to indicate loading.',
        },
      },
    },
    success: {
      options: [true, false],
      control: { type: 'inline-radio' },
      description: 'Displays a still checkmark svg',
      table: {
        type: {
          detail:
            'Optional prop indicating when to display a success graphic. As this graphic is an svg, its styles can be overridden by targeting svgs within the button. Does not disable the button, but does update the aria-label to indicate the success state.',
        },
      },
    },
    error: {
      options: [true, false],
      control: { type: 'inline-radio' },
      description: 'Displays a still exclamation mark svg',
      table: {
        type: {
          detail:
            'Optional prop indicating when to display an error graphic. As this graphic is an svg, its styles can be overridden by targeting svgs within the button. Does not disable the button, but does update the aria-label to indicate the error state.',
        },
      },
    },
    disabled: {
      options: [true, false],
      control: { type: 'inline-radio' },
      description: 'Disables and greys out the button',
      table: {
        type: {
          detail:
            'Optional prop to disable the button. Updates both the styles and aria-disabled property to indicate disabled state.',
        },
      },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
      description: 'Preset button size',
      table: {
        type: {
          detail:
            'Optionally choose one of three predetermined sizes. Defaults to medium. All size-related properties can be overriden with the `style` prop (changeable in this table)',
        },
      },
    },
    color: {
      options: [
        'red',
        'green',
        'teal',
        'blue',
        'white',
        'transparent',
        'disabled',
      ],
      control: { type: 'select' },
      description: 'Preset button color',
      table: {
        type: {
          detail:
            'Optionally choose one of seven predetermined colors. Defaults to blue. Both background color and text color can be overriden with the `style` prop (changeable in this table)',
        },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'Children rendered inside button',
      table: {
        type: {
          summary: 'React.ReactNode',
          detail:
            'In this table, the `children` prop is only ever a string for control purposes. In-situ, the `children` prop can be any valid React Node.',
        },
      },
    },
    fullWidth: {
      options: [true, false],
      control: { type: 'inline-radio' },
      description: 'Toggle fullWidth',
      table: {
        type: {
          detail:
            'Sets the button to 100% of its parent container. All width-related properties (minWidth, maxWidth, etc) can be overriden with the `style` prop (changeable in this table)',
        },
      },
    },
    style: {
      control: { type: 'object' },
      description: 'Style Override Object',
      table: {
        type: {
          detail: `A CSSProperty object. Anything passed to the button within the style prop will override any default styles the button may use. E.g., if the button \`color\` prop is set to "red" but the \`style\` prop includes \`{ backgroundColor: "#333333", color: "#FFF327" }\` then the button will be black with yellow text, rather than red with white text.`,
        },
      },
    },
    svgColor: {
      control: { type: 'color' },
      description: 'Override SVG color',
      table: {
        type: {
          detail:
            'Override color specifically targeting the loading, success, and error state icons. If this is not set, it will default first to any `color` attribute within the `styles` prop, and if there is no `styles` prop, or the `styles` prop does not specify text `color`, it falls back again to either blue (for a white button) or white (for a colorful button).',
        },
      },
    },
  },
  args: {
    children: 'button',
    size: 'medium',
    fullWidth: false,
    loading: false,
    error: false,
    success: false,
    disabled: false,
    style: { width: '150px' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

const sectionStyle = {
  display: 'flex',
  width: '90%',
  maxWidth: 800,
  flexDirection: 'row' as any,
  alignItems: 'center',
  justifyContent: 'flex-start',
  margin: 20,
};

const DefaultButton = Template.bind({});
export const Default = (args: ButtonProps) => (
  <div style={sectionStyle}>
    <DefaultButton {...args} />
  </div>
);

const StyledButton = Template.bind({});
export const Styled = (args: ButtonProps) => (
  <>
    <div style={sectionStyle}>
      <StyledButton
        {...args}
        style={{
          borderRadius: 40,
          height: 80,
          width: 500,
          fontSize: 30,
          color: '#ffd6f3',
          backgroundColor: '#e889cc',
          fontFamily: '"Comic Sans MS", cursive, sans-serif',
          boxShadow: `6px 8px  #c46a6a,
  10px 12px  #d49c53,
  14px 16px  #e8da7d,
  18px 20px  #a5d481,
  22px 24px  #84d9d3,
  26px 28px  #8ab2e3,
  30px 32px  #ae87e0`,
        }}
      />
    </div>
  </>
);
