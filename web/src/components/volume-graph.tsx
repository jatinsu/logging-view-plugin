import React from 'react';
import { VolumeRangeResponse } from '../logs.types';
import './volume-graph.css';
import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartVoronoiContainer,
} from '@patternfly/react-charts';

interface VolumeGraphProps {
  volumeData?: VolumeRangeResponse;
}

export const VolumeGraph: React.FC<VolumeGraphProps> = ({ volumeData }) => {
  const data: { x: Date; y: number }[] =
    volumeData?.data.result[0].values.map(([x, y]) => ({
      x: new Date(Number(x) * 1000),
      y: Number(y), // Convert y value to number
    })) || [];

  return (
    <div style={{ height: '600px' }}>
      <Chart
        ariaDesc="Volume over time"
        ariaTitle="Volume chart"
        maxDomain={{ y: Math.max(...data.map((d) => d.y)) * 1.1 }}
        minDomain={{ y: Math.min(...data.map((d) => d.y)) * 0.9 }}
        padding={{ bottom: 50, left: 100, right: 50, top: 50 }}
        containerComponent={
          <ChartVoronoiContainer
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            constrainToVisibleArea
          />
        }
      >
        <ChartAxis
          tickFormat={(t) => {
            if (typeof t === 'number') {
              const date = new Date(t);
              return `${date.getHours()}:${date.getMinutes()}`;
            }
            return `${t.getHours()}:${t.getMinutes()}`;
          }}
        />
        <ChartAxis dependentAxis showGrid tickFormat={(t) => `${t / 1000000}M`} />
        <ChartGroup>
          <ChartLine data={data} />
        </ChartGroup>
      </Chart>
    </div>
  );
};
