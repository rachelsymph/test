import styled from 'styled-components';

export const Recipient = styled.div`
  display: flex;
  text-align: center;
`;

export const GiveItemStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 5px 0px;
  text-align: center;
`;

export const NumberContainer = styled.div`
  border-radius: 20px;
  width: 25px;
  height: 25px;
  display: flex;
  text-align: center;
  justify-content: center;
  margin-right: 5px;
`;

export const ColoredNumberContainer = styled(NumberContainer)`
  background-color: ${(props) => props.theme.colors.teal2};
  color: ${(props) => props.theme.colors.white};
`;
