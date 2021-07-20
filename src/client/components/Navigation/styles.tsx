import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;
  background-color: ${(props) => props.theme.colors.white};

  .ant-divider-horizontal {
    margin: 0;
  }
`;

export const Logo = styled.img`
  height: 35px;
`;

export const Nav = styled.nav`
  display: flex;
  margin: auto;
  padding: 18px 15px;
  max-width: ${(props) => props.theme.extras.maxWidth};
  align-items: center;
  justify-content: space-between;
`;
