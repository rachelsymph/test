import styled from 'styled-components';

export const SectionStyle = styled.div`
  background-color: transparent;
  border-radius: 0px;
  flex-wrap: wrap;
  @media ${(props) => props.theme.device.laptop} {
    margin-bottom: 60px;
    background-color: ${(props) =>
      props.style?.backgroundColor || 'transparent'};
    padding: ${(props) => props.style?.padding};
    border-radius: 20px;
    flex-wrap: no-wrap;
  }
`;

export const BorderedSectionStyle = styled(SectionStyle)`
  @media ${(props) => props.theme.device.laptop} {
    border: 1px solid ${(props) => props.theme.colors.blueGray};
    padding: 60px 30px;
  }
`;

export const ContentContainer = styled.div`
  padding-bottom: 30px;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  @media ${(props) => props.theme.device.desktop} {
    flex-direction: row;
    flex-wrap: no-wrap;
  }
`;
