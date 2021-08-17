import styled from 'styled-components';

export const StyledHeader = styled.div`
  display: flex;
  margin: auto;
  max-width: ${(props) => props.theme.extras.maxWidth};
  align-items: center;
  justify-content: space-between;
`;

export const StyledTitleHeader = styled.div`
  color: ${(props) => props.theme.colors.royalBlue};
  line-height: 40.32px;
`;

export const StyledSubHeader = styled.div`
  color: ${(props) => props.theme.colors.gray2};
  line-height: 27.33px;
`;

export const StyledHeaderAction = styled.div`
  position: absolute;
  right: 100px;
`;
