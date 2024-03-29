import { Card } from 'antd';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  font-size: ${(props) => props.theme.fontSizes.buttonSize};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  border-radius: 20px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 5px;
  .ant-card-body {
    padding: 0px;
  }
  .ant-card-cover img {
    border-radius: 20px 20px 0 0;
  }
`;
