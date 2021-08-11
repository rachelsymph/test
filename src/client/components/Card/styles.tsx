import { Card } from 'antd';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  font-size: ${(props) => props.theme.fontSizes.buttonSize};
  font-weight: ${(props) => props.theme.fontWeights.regular};
`;
