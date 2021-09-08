import { Carousel } from 'antd';
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
  padding: 120px 120px 40px;
  justify-content: space-evenly;
`;

export const GalleryStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const Icon = styled.img`
  width: 82px;
  height: 82px;
  margin-bottom: 38.13px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 60px;
  justify-content: space-between;
`;

export const RecurringGivesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 320px;
  width: 100%;
  padding-left: 50px;
`;

export const RecurringGivesList = styled(GalleryStyled)`
  padding-top: 20px;
`;
