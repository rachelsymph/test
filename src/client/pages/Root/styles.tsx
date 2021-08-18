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
  padding: 150px 150px 40px;
  justify-content: space-evenly;
`;

export const CarouselContainer = styled.div`
  min-width: 0;
  border-radius: 20px;
  margin-left: 10px;
  background: url('/donations.png');
  .ant-carousel .slick-list .slick-slide > div > div {
    height: 300px;
  }
  width: 763px;
`;

export const CarouselContent = styled.div`
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  padding: 70px 200px 0 200px;
`;

export const Donations = styled(Carousel)`
  > .slick-dots li button {
    width: 6px;
    height: 6px;
    border-radius: 100%;
    border-color: ${(props) => props.theme.colors.white};
  }
  > .slick-dots li.slick-active button {
    width: 7px;
    height: 7px;
    border-radius: 100%;
    background: ${(props) => props.theme.colors.white};
  }
  min-width: 0;
  padding: 10px 20px;
  align-content: center;
  text-align: center;
  background: transparent;
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
