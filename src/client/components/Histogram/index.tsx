import React, { useState, useEffect } from 'react';

import { HistogramStyled } from './styles';

type Props = {
  data?: object[];
  xField: string;
  yField: string;
};

const DEFAULT_DATA = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
];

export default function Histogram(props: Props) {
  const { data = DEFAULT_DATA, xField, yField } = props;
  var config = {
    data,
    xField,
    yField,
    columnWidthRatio: 0.8,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    color: '#0ABCC7',
  };
  return <HistogramStyled {...config} />;
}
