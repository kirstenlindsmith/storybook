/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@emotion/react';
import React from 'react';

//helpers
import { bestTextColor } from '../helpers/functions';
import { colorValues } from '../helpers/colors';
import { ButtonColor } from './constants';

//assets
import IcSuccess from '../Icons/IcSuccess';
import IcLoading from '../Icons/IcLoading';
import IcWarning from '../Icons/IcWarning';

//styles
import {
  buttonLoadingAnimation,
  buildButtonStyle,
  ColorButton,
  Ripple,
} from './style';

type BaseProps = React.ComponentPropsWithoutRef<'button'>;

export interface ButtonProps extends BaseProps {
  children: React.ReactNode;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  color?: ButtonColor;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  svgColor?: string;
  style?: React.CSSProperties;
}

const defaultState: {
  rippleCount: number;
  rippleStyle: {
    [key: string]: any;
  };
} = {
  rippleCount: 0,
  rippleStyle: {},
};

const Button = ({
  loading,
  children,
  color = 'blue',
  size = 'medium',
  fullWidth,
  svgColor,
  style,
  success,
  error,
  disabled,
  ...rest
}: ButtonProps) => {
  const [isFocused, setFocused] = React.useState<boolean | undefined>(false);
  const [rippleCount, setRippleCount] = React.useState(
    defaultState.rippleCount
  );
  const [rippleStyles, setRippleStyle] = React.useState(
    defaultState.rippleStyle
  );

  const [rippleTimeout, setRippleTimeout] = React.useState();

  //cleanup ripple effects on dismount
  React.useEffect(() => {
    return () => {
      if (rippleTimeout) clearTimeout(rippleTimeout);
    };
  }, [rippleTimeout]);

  const findImportantProps = () => {
    let background: string | undefined;
    let textColor: string | undefined;
    let styles = {};
    let onClick: ((e: any) => void) | undefined;

    const { onClick: parentOnClick, ...other } = rest;

    if (parentOnClick) {
      onClick = (e: any) => {
        e?.preventDefault?.();
        parentOnClick(e);
      };
    }

    if (style) {
      const {
        backgroundColor,
        color: parentTextColor,
        ...otherParentStyles
      } = style;
      background = backgroundColor;
      textColor =
        parentTextColor ||
        (backgroundColor ? bestTextColor(backgroundColor) : undefined);
      styles = { ...otherParentStyles };
    }
    return {
      onClick,
      background,
      textColor,
      styles,
      other,
    };
  };
  const allProps = findImportantProps();

  const colorButtonStyles = buildButtonStyle({
    size,
    fullWidth,
    overrideStyle: allProps?.styles,
    color: (disabled && 'disabled') || color,
  });

  const loadingIconColor =
    svgColor ||
    allProps?.textColor ||
    (color === 'white' ? colorValues.frenchblue : colorValues.emptiness);

  const addRipple = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.FocusEvent<HTMLButtonElement>,
    focus?: boolean
  ) => {
    if (!disabled) {
      setFocused(focus);
      const rippleContainer = e?.currentTarget;
      const rippleSize = rippleContainer?.offsetWidth ?? 0;
      const position = rippleContainer?.getBoundingClientRect();
      const x = focus
        ? 'auto'
        : ((e as React.MouseEvent<HTMLDivElement, MouseEvent>)?.pageX ?? 0) -
          (position?.x ?? 0) -
          rippleSize / 2;
      const y = focus
        ? 'auto'
        : ((e as React.MouseEvent<HTMLDivElement, MouseEvent>)?.pageY ?? 0) -
          (position?.y ?? 0) -
          rippleSize / 2;

      const newRippleStyle = {
        top: focus ? y : y + 'px',
        left: focus ? x : x + 'px',
        height: rippleSize + 'px',
        width: rippleSize + 'px',
      };
      const newRippleCount = rippleCount + 1;

      setRippleStyle((current) => ({
        ...current,
        [newRippleCount]: newRippleStyle,
      }));
      setRippleCount(newRippleCount);
    }
  };

  const cleanUpRipple = (
    _e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.FocusEvent<HTMLButtonElement>
  ) => {
    if (isFocused) setFocused(false);
    if (rippleTimeout) clearTimeout(rippleTimeout);

    const newRippleTimeout = setTimeout(() => {
      setRippleCount(defaultState.rippleCount);
      setRippleStyle(defaultState.rippleStyle);
    }, 855);

    setRippleTimeout(newRippleTimeout as any);
  };

  const renderRipple = () => {
    //using the styles object allows for unlimited simultaneous ripples
    const ripples = Object.keys(rippleStyles);
    if (ripples?.length) {
      return ripples?.map((key, index) => {
        return (
          <span key={`ripple-${index}`} style={{ ...rippleStyles[key] }} />
        );
      });
    } else return null;
  };

  return (
    <ColorButton
      color={(disabled && 'disabled') || color}
      backgroundColor={allProps?.background}
      textColor={allProps?.textColor}
      css={buttonLoadingAnimation}
      style={{
        ...colorButtonStyles,
        ...allProps?.styles,
      }}
      loading={loading ? 'loading' : undefined}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      onFocus={(e) => {
        //if the focus is coming from something other than a click event,
        //there won't be any other ripples yet
        if (Object.keys(rippleStyles)?.length < 1) {
          addRipple(e, true);
        }
      }}
      //only run cleanup on blur, allowing ripples to play and fade uninterrupted until button out of use
      onBlur={cleanUpRipple}
      onClick={allProps.onClick}
      aria-label={
        error
          ? 'ERROR'
          : success
          ? 'SUCCESS'
          : loading
          ? 'LOADING'
          : allProps?.other?.['aria-label'] ?? 'BUTTON'
      }
      {...allProps?.other}
    >
      {(error && <IcWarning color={loadingIconColor} />) ||
        (success && <IcSuccess color={loadingIconColor} />) ||
        (loading && <IcLoading color={loadingIconColor} />) ||
        children}
      <Ripple focus={isFocused} onMouseDown={addRipple}>
        {renderRipple()}
      </Ripple>
    </ColorButton>
  );
};

export default Button;
