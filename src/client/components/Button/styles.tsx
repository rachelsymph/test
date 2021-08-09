import { Button } from 'antd';
import styled from 'styled-components';

export const StyledButton = styled(Button)`
  padding: 12px 24px;
  height: auto;
  border-radius: 8px;
  font-size: ${(props) => props.theme.fontSizes.buttonSize};
  font-weight: ${(props) => props.theme.fontWeights.medium};

  &.ant-btn.ant-btn-primary:not(.ant-btn-dangerous) {
    background: ${(props) => props.theme.colors.primary1};
    border-color: ${(props) => props.theme.colors.primary1};
  }

  &.ant-btn-secondary {
    background: ${(props) => props.theme.colors.dark_50};
    border-color: ${(props) => props.theme.colors.dark_50};
  }

  &.ant-btn-secondary:hover,
  &.ant-btn-secondary:focus {
    color: ${(props) => props.theme.colors.dark_900};
    outline-color: ${(props) => props.theme.colors.dark_900};
  }

  &.ant-btn-lg,
  &.ant-btn {
    padding: 12px 24px;
    line-height: 1;
  }

  &.ant-btn-sm {
    padding: 8px 10px;
  }
`;
