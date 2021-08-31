import { Radio } from 'antd';
import styled from 'styled-components';

export const RadioGroup = styled(Radio.Group)`
  .ant-radio-group-solid .ant-radio-button-wrapper-checked {
    background-color: ${(props) => props.theme.colors.white};
  }
`;

export const RadioButton = styled(Radio.Button)`
  .ant-radio-group-solid .ant-radio-button-wrapper-checked {
    background-color: ${(props) => props.theme.colors.teal1};
  }
  .ant-radio-button-wrapper-checked {
    background-color: ${(props) => props.theme.colors.teal1};
  }
  display: none;
  @media ${(props) => props.theme.device.mobileL} {
    display: inline-block;
  }
`;

export const RadioButtonRight = styled(RadioButton)`
  border-radius: 10px 0 0 10px;
  .ant-radio-button-wrapper-checked {
    background-color: ${(props) => props.theme.colors.teal1};
  }
`;

export const RadioButtonLeft = styled(RadioButton)`
  border-radius: 0 10px 10px 0;
`;
