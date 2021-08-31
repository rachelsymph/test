import { Row } from 'antd';
import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled(Row)`
  margin: auto;

  @media ${(props) => props.theme.device.laptop} {
    padding: 95px 15px 15px;
    max-width: ${(props) => props.theme.extras.maxWidth};
    background-color: none;
  }
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
  @media ${(props) => props.theme.device.desktop} {
    padding-top: 50px;
  }
`;

export const SummaryContent = styled.div`
  display: flex;
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

export const SectionContentStyled = styled(GalleryStyled)`
  @media ${(props) => props.theme.device.desktop} {
    flex-flow: nowrap;
  }
`;
