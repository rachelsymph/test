import React from 'react';

import { ContentContainer, SectionStyle } from './styles';

type Props = {
  content?: React.ReactNode;
  title?: React.ReactNode;
  style?: React.CSSProperties;
};
export default function Section(props: Props) {
  const { content, title, ...remainingProps } = props;
  return (
    <SectionStyle {...remainingProps}>
      {title}
      <ContentContainer>{content}</ContentContainer>
    </SectionStyle>
  );
}
