import { Radio } from 'antd';
import React from 'react';

import { RadioButtonLeft, RadioButtonRight, RadioGroup } from './styles';

type Props = {
  onChange: any;
  value1: string;
  value2: string;
};
export default function RadioButtonGroup(props: Props) {
  const { onChange, value1, value2 } = props;
  return (
    <RadioGroup onChange={onChange} defaultValue={value1} buttonStyle="solid">
      <RadioButtonRight value={value1}>{value1}</RadioButtonRight>
      <RadioButtonLeft value={value2}>{value2}</RadioButtonLeft>
    </RadioGroup>
  );
}
