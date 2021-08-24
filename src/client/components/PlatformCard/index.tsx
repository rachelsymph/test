import { Space } from 'antd';
import React, { useContext } from 'react';

import { ThemeContext } from 'styled-components';

import { Card, Text } from 'src/client/components';

import { Platform } from 'src/commons/types/Platform.type';

import { PlatformContainer } from './styles';

type Props = {
  platform: Platform;
};

export default function GalleryCard(props: Props) {
  const { platform } = props;
  const name = String(platform.name);
  const cover = String(platform.cover);
  return (
    <Card>
      <PlatformContainer src={cover} alt={name}></PlatformContainer>
    </Card>
  );
}
