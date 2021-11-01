import _ from 'lodash';
import { colorValues, cssColorValues } from './colors';

const alphabeticalHelper = (first?: string, second?: string) =>
  (first?.toLowerCase() || 'a') < (second?.toLowerCase() || 'b') ? -1 : 1;

export const alphabeticalSort = (
  input?: any[] | null,
  criteriaA?: string,
  criteriaB?: string
) => {
  if (input) {
    //to handle read-only arrays
    const inputCopy = _.cloneDeep(input ?? []);
    if (criteriaA) {
      return (
        inputCopy.sort((first, second) => {
          const firstA = first[criteriaA];
          const secondA = second[criteriaA];
          const formattedFirstA =
            typeof firstA === 'string' ? firstA.toLowerCase() : firstA;
          const formattedSecondA =
            typeof secondA === 'string' ? secondA.toLowerCase() : secondA;

          //sort preferentially by the first criteria
          if (formattedFirstA > formattedSecondA) return 1;
          if (formattedFirstA < formattedSecondA) return -1;
          //but hold off on returning if there are any === cases...
          if (criteriaB) {
            //sort additionally by second criteria, if there is one
            const firstB = first[criteriaB];
            const secondB = second[criteriaB];
            const formattedFirstB =
              typeof firstB === 'string' ? firstB.toLowerCase() : firstB;
            const formattedSecondB =
              typeof secondB === 'string' ? secondB.toLowerCase() : secondB;
            if (formattedFirstB > formattedSecondB) return 1;
            if (formattedFirstB < formattedSecondB) return -1;
          }
          //and catch any default cases
          return 1;
        }) ?? []
      );
    } else
      return (
        inputCopy.sort((first, second) => alphabeticalHelper(first, second)) ??
        []
      );
  } else return [];
};

export const endsWithS = (name: string) =>
  name.charAt(name.length - 1).toLowerCase() === 's';

export const pluralNoun = (noun?: string | null) => {
  if (noun) {
    const endsWithY = noun.charAt(noun.length - 1).toLowerCase() === 'y';
    if (endsWithY) {
      return noun.slice(0, noun.length - 1) + 'ies';
    }
    return endsWithS(noun) ? noun + `es` : noun + `s`;
  } else return 'items';
};

export const findHexBrightness = (color: string) => {
  let workingColor = color;

  if (
    workingColor === '#fff' ||
    workingColor === '#ffff' ||
    workingColor === 'transparent'
  ) {
    workingColor = '#ffffff';
  }

  if (color.slice(0, 6) === 'var(--') {
    workingColor = cssColorValues[color];
  }

  const colorVal = parseInt(workingColor.replace('#', ''), 16);
  //tone-indifferent extractions to determine shade
  const extractR = (colorVal >> 16) & 0xff;
  const extractG = (colorVal >> 8) & 0xff;
  const extractB = (colorVal >> 0) & 0xff;
  const brightness = 0.2126 * extractR + 0.7152 * extractG + 0.0722 * extractB;

  return brightness;
};

export const darkenLightColor = (color: string) => {
  const brightness = findHexBrightness(color);
  //Dark ONLY IF brightness is too light to contrast with a very light color (e.g., yellow text on white)
  if (brightness > 190) {
    return changeHexColor(color, -15);
  } else return color;
};

export const changeHexColor = (color: string, percent: number) => {
  let workingColor = color;
  if (color.slice(0, 6) === 'var(--') {
    workingColor = cssColorValues[color];
  }

  if (
    workingColor === '#fff' ||
    workingColor === '#ffff' ||
    workingColor === '#ffffff' ||
    workingColor === 'transparent'
  )
    return colorValues.dust;

  let workingPercent = percent;
  const colorVal = parseInt(workingColor.replace('#', ''), 16);
  const brightness = findHexBrightness(workingColor);

  //if the color is too dark to be darkened, or too light to be lightened, reverse the goal shade
  if ((brightness < 60 && percent < 0) || (brightness > 225 && percent > 0)) {
    workingPercent = -percent;
  }

  //tone-preserving color conversion
  const changeAmount = Math.round(2.55 * workingPercent); //account for 0-255 instead of 0-100 color scale
  const R = (colorVal >> 16) + changeAmount;
  const G = (colorVal & 0x0000ff) + changeAmount;
  const B = ((colorVal >> 8) & 0x00ff) + changeAmount;

  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + //if R/G/B are too dark or too light, set to limit
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16) //convert back to hex string
      .slice(1) //remove inevitable leading 1
  );
};

export const hexAccessibilityContrast = (
  colorA: string,
  colorB: string,
  large?: boolean
) => {
  const bestWCAGRatio = large ? 3 / 1 : 4.5 / 1;

  const aBrightness = findHexBrightness(colorA);
  const bBrightness = findHexBrightness(colorB);
  const ratio =
    aBrightness > bBrightness
      ? aBrightness / bBrightness
      : bBrightness / aBrightness;

  return ratio >= bestWCAGRatio;
};

export const useBlackText = (color?: string) => {
  let workingColor = color;
  if (color?.slice(0, 6) === 'var(--') {
    workingColor = cssColorValues[color];
  }

  if (
    !workingColor ||
    workingColor === '#fff' ||
    workingColor === '#ffff' ||
    workingColor === '#ffffff' ||
    workingColor === 'transparent'
  )
    return true;

  const colorBrightness = findHexBrightness(workingColor ?? '#ffffff');

  return colorBrightness > 190;
};

export const bestTextColor = (color?: string) =>
  useBlackText(color) ? colorValues.betterptblack : colorValues.emptiness;
