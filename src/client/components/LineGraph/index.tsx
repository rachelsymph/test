import {
  Area,
  LineConfig,
  AreaConfig,
  ColumnConfig,
  Plot,
  PlotEvent,
} from '@ant-design/charts';
import React from 'react';

import defaultTheme from 'src/client/themes/default';
import { GiveSummary } from 'src/commons/types/GiveSummary.type';

type Props = {
  data: GiveSummary[];
  xField: string;
  yField: string;
};

let PreTooltipData: { date: string; value: number };

type Base = LineConfig | AreaConfig | ColumnConfig;

const PlotMaps: Record<string, Plot<Base>> = {};

export default function LineGraph(props: Props) {
  const { data, xField, yField } = props;

  const showTooltip = ({ x, y }: { x: number; y: number }) => {
    Object.keys(PlotMaps).forEach((plot) => {
      PlotMaps[plot].chart.showTooltip({ x, y });
    });
  };

  const setTooltipPosition = (evt: PlotEvent, plot: Plot<Base>) => {
    const { x, y } = evt.gEvent;
    const currentData = plot.chart.getTooltipItems({ x, y });
    if (currentData[0]?.data.date === PreTooltipData?.date) {
      return;
    }
    PreTooltipData = currentData[0]?.data;
    showTooltip({ x, y });
  };

  const config = {
    data,
    xField,
    yField,
    height: 200,
    areaStyle: {
      fill: defaultTheme.colors.teal2,
    },
    color: defaultTheme.colors.teal2,
  };

  return (
    <Area
      {...config}
      onReady={(plot) => {
        PlotMaps.area = plot;
        plot.on('mousemove', (evt: PlotEvent) => {
          setTooltipPosition(evt, plot);
        });
      }}
    />
  );
}
