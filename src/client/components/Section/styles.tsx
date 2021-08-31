import styled from 'styled-components';

import { device } from 'src/commons/constants/device';

export const SectionStyle = styled.div`
  background-color: transparent;
  @media ${device.laptop} {
    margin-bottom: 60px;
    background-color: ${(props) =>
      props.style?.backgroundColor || 'transparent'};
    padding: ${(props) => props.style?.padding};
    border-radius: 20px;
  }
`;

export const BorderedSectionStyle = styled(SectionStyle)`
  border: 1px solid ${(props) => props.theme.colors.blueGray};
  padding: 60px 30px;
`;

export const ContentContainer = styled.div`
  padding-bottom: 30px;
  justify-content: center;
  display: flex;
  @media ${device.desktop} {
    flex-direction: row;
    flex-wrap: no-wrap;
  }
`;
