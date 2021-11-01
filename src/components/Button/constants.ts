import { colorValues } from '../helpers/colors';
import { changeHexColor } from '../helpers/functions';

export enum heightValues {
  large = 48,
  medium = 36,
  small = 28,
}

export enum fontSizeValues {
  large = 16,
  medium = 14,
  small = 12,
}

export enum paddingValues {
  large = '8px 22px',
  medium = '6px 16px',
  small = '4px 10px',
}

export type ButtonColor =
  | 'red'
  | 'blue'
  | 'teal'
  | 'white'
  | 'green'
  | 'transparent'
  | 'disabled';

export const buttonColorDictionary = {
  blue: {
    color: colorValues.earlysteam,
    background: colorValues.frenchblue,
    border: 'none',
    interact: colorValues.eveningsky,
  },
  red: {
    color: colorValues.emptiness,
    background: colorValues.orangepink,
    border: 'none',
    interact: colorValues.messyketchup,
  },
  teal: {
    background: colorValues.teal,
    color: colorValues.emptiness,
    border: 'none',
    interact: changeHexColor(colorValues.teal, -15),
  },
  white: {
    color: colorValues.frenchblue,
    background: colorValues.earlysteam,
    border: `1px solid ${colorValues.frenchblue}`,
    interact: colorValues.dust,
  },
  green: {
    color: colorValues.emptiness,
    background: colorValues.guajirogreen,
    border: 'none',
    interact: changeHexColor(colorValues.guajirogreen, -15),
  },
  transparent: {
    color: colorValues.frenchblue,
    background: 'transparent',
    border: 'none',
    interact: 'rgba(51, 51, 51, 0.25)',
  },
  disabled: {
    color: `${colorValues.emptiness} !important`,
    background: `${colorValues.coneyislandsidewalk} !important`,
    border: 'none',
    interact: `${colorValues.coneyislandsidewalk} !important`,
  },
};
