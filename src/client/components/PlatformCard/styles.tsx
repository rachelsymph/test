import styled from 'styled-components';

export const PlatformContainer = styled.img`
  @media ${(props) => props.theme.device.laptop} {
    padding: 110px 30px;
  }
  padding: 50px;
  max-width: 100%;
  height: auto;
`;
