import { Col } from 'antd';
import React from 'react';

import { BorderedSectionStyle, ContentContainer, SectionStyle } from './styles';

type Props = {
  content?: React.ReactNode;
  title?: React.ReactNode;
  style?: React.CSSProperties;
  borded?: boolean;
};
export default function Section(props: Props) {
  const { content, title, borded, ...remainingProps } = props;
  return (
    <Col span={24}>
      {borded && (
        <BorderedSectionStyle>
          {title}
          <ContentContainer>{content}</ContentContainer>
        </BorderedSectionStyle>
      )}
      {!borded && (
        <SectionStyle {...remainingProps}>
          {title}
          <ContentContainer>{content}</ContentContainer>
        </SectionStyle>
      )}
    </Col>
  );
}
