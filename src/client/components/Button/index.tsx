import { ButtonProps } from 'antd';
import React from 'react';

import { StyledButton } from './styles';

type Props = Omit<ButtonProps, 'size' | 'type'> & {
  size?: any;
  type: 'link' | 'text' | 'default' | 'secondary' | 'ghost' | 'dashed' | 'primary' | undefined | any;
}

export default function Button(props: Props) {
  const { children, ...remainingProps } = props;

  return (
    <StyledButton {...remainingProps} >
      {children}
    </StyledButton>
  );
}
