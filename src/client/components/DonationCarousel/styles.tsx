import { Carousel } from 'antd';
import styled from 'styled-components';

export const CarouselContainer = styled.div`
  min-width: 0;
  border-radius: 20px;
  background: url('/donations.png');
  .ant-carousel .slick-list .slick-slide > div > div {
    height: 300px;
  }
  margin: 5px;
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
