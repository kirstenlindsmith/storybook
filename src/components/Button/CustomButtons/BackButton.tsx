import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '..';
import IcArrowLeft from '../../Icons/IcArrowLeft';
import { colorValues } from '../../helpers/colors';

interface Props {
  onBack?: () => void;
}

const BackButton = ({ onBack, style }: Props & any) => {
  const history = useHistory();
  return (
    <Button
      color={'transparent' as any}
      onClick={() => {
        if (onBack) {
          onBack();
        } else {
          history?.goBack?.();
        }
      }}
      aria-label='Back'
      style={{
        position: 'absolute' as 'absolute',
        top: 15,
        left: 16,
        minWidth: 0,
        width: 28,
        height: 28,
        padding: 0,
        ...(style ?? {}),
      }}
    >
      <IcArrowLeft color={colorValues.charcoalgray} style={{ marginLeft: 1 }} />
    </Button>
  );
};

export default BackButton;
