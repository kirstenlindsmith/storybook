import React from 'react';
import Button from '..';
import { colorValues } from '../../helpers/colors';

const editButtonStyle = {
  width: 96,
  backgroundColor: colorValues.dust,
};

const saveButtonStyle = {
  width: 96,
  backgroundColor: colorValues.frenchblue,
};

interface Props {
  editModeActive: boolean;
  onClickEdit: () => void;
  onClickSave: () => void | Promise<void>;
  editText?: string;
  saveText?: string;
  loading?: boolean;
  style?: React.CSSProperties;
}

const EditSaveButton = ({
  editModeActive,
  onClickEdit,
  onClickSave,
  editText = 'EDIT',
  saveText = 'SAVE',
  loading,
  style,
  ...rest
}: Props) =>
  //ternary prevents any delay in button colors updating
  editModeActive ? (
    <Button
      {...rest}
      size='small'
      style={{ ...saveButtonStyle, ...(style ?? {}) }}
      onClick={onClickSave}
      loading={loading}
    >
      {saveText}
    </Button>
  ) : (
    <Button
      {...rest}
      size='small'
      style={editButtonStyle}
      onClick={onClickEdit}
    >
      {editText}
    </Button>
  );

export default EditSaveButton;
