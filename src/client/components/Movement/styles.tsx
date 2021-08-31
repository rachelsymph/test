import styled from 'styled-components';

export const StyledMovement = styled.div`
  background: url('/movement.png');
  background-size: cover;
  border-radius: 20px;
  height: 357px;
  padding: 50px;

  @media ${(props) => props.theme.device.laptop} {
    padding: 50px 200px 60px 30px;
  }
`;
