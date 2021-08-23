import styled from 'styled-components';

export const SectionStyle = styled.div`
  background-color: ${(props) => props.style?.backgroundColor || 'transparent'};
  padding: ${(props) => props.style?.padding};
  border-radius: 20px;
  margin-bottom: 60px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 30px;
  justify-content: space-between;
`;
