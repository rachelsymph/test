import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  margin: auto;
  padding: 95px 15px 15px;
  max-width: ${(props) => props.theme.extras.maxWidth};
`;

export const CoverLabel = styled.div`
  height: 331px;
  background: url('/homecover.png');
  align-items: center;
  display: flex;
  padding: 150px 150px 40px;
  justify-content: space-evenly;
`;

export const Icon = styled.img`
  width: 82px;
  height: 82px;
  margin-bottom: 38.13px;
`;

export const GalleryStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 50px;
`;

export const SubGalleryStyled = styled.div`
  display: flex;
  justify-content: center;
`;

export const SummaryContent = styled.div`
  display: flex;
`;

export const RecurringGivesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 320px;
  width: 400px;
  padding-left: 20px;
`;

export const Recipient = styled.div`
  display: flex;
  text-align: center;
`;

export const GiveOverTime = styled.div`
  display: flex;
  flex-direction: row;
  width: 400px;
  justify-content: space-between;
  padding: 5px 0px;
  text-align: center;
`;

export const NumberContainer = styled.div`
  background-color: ${(props) => props.theme.colors.teal2};
  color: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  width: 25px;
  height: 25px;
  display: flex;
  text-align: center;
  justify-content: center;
  margin-right: 5px;
`;
