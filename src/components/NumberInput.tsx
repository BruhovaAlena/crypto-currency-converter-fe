import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants/colors';

const StyledInput = styled.input`
  width: 100%;
  border-radius: 25px;
  height: 50px;
  border-color: ${COLORS.gray};
  border-width: 1px;
  padding-left: 12px;
  padding-right: 12px;

  &:focus {
    outline: none;
    border-color: ${COLORS.blue};
  }
  &::placeholder {
    color: ${COLORS.gray};
  }
  &:disabled {
    border-color: ${COLORS.lightGray};
    &::placeholder {
      color: ${COLORS.lightGray};
    }
  }
`;

type NumberInputProps = {
  value: number | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
};

const NumberInput = ({
  onChange,
  value,
  placeholder,
  isDisabled,
  isReadOnly,
}: NumberInputProps) => {
  return (
    <StyledInput
      placeholder={placeholder}
      type="number"
      value={value}
      onChange={onChange}
      disabled={isDisabled}
      readOnly={isReadOnly}
    />
  );
};

export default NumberInput;
