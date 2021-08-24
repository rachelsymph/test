import { Carousel } from 'antd';
import styled from 'styled-components';

export const CarouselContainer = styled.div`
  min-width: 0;
  border-radius: 20px;
  background: url('/donations.png');
  background-repeat: no-repeat;
  background-size: cover;
  .ant-carousel .slick-list .slick-slide > div > div {
    height: 380px;
  }
  margin: 5px;
  width: 100%;
`;

export const CarouselContent = styled.div`
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  padding: 150px 200px 0 200px;
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
  >
  min-width: 0;
  padding: 10px 20px;
  align-content: center;
  text-align: center;
  background: transparent;
  display: flex;
`;

export const DonationDetailContent = styled.div`
  display: flex !important;
  flex-direction: column;
  padding: 250px 0 0 0;
  text-align: start;
`;
