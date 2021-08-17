import { Carousel } from 'antd';
import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  margin: auto;
  padding: 95px 15px 15px;
  max-width: ${(props) => props.theme.extras.maxWidth};
`;

export const Cover = styled.img`
  height: 331px;
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
  .ant-carousel {
    min-width: 0;
  }
  min-width: 0;
  padding: 10px 20px;
  align-content: center;
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
  justify-content: space-evenly;
`;
