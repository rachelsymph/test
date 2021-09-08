import styled from 'styled-components';

export const StyledGalleryCard = styled.div`
  padding 20px;
  width: 350px;
  place-self: flex-end;
  align-content: flex-end;
`;

export const MiniStyledGalleryCard = styled(StyledGalleryCard)`
  width: 260px;
`;

export const DetailsContainer = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  margin: 0;
  width: 100%;
`;

export const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
`;
