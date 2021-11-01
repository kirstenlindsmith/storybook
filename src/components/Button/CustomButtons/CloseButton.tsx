import React from 'react';

import Button from '..';
import IcClose from '../../Icons/IcClose';
import { colorValues } from '../../helpers/colors';

export default ({
  onClose,
  style,
  ...rest
}: { onClose: () => void } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => (
  <Button
    color={'transparent' as any}
    onClick={() => onClose()}
    aria-label='Close'
    style={{
      position: 'absolute',
      top: 15,
      right: 16,
      minWidth: 0,
      width: 28,
      height: 28,
      padding: 0,
      ...(style ?? {}),
    }}
    {...rest}
  >
    <IcClose color={colorValues.charcoalgray} style={{ marginRight: 1 }} />
  </Button>
);
