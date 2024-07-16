import React from 'react';
import { VolumeRangeResponse } from '../logs.types';
// import { TestIds } from '../test-ids';
// import { useTranslation } from 'react-i18next';
import './stats-table.css';

interface VolumeGraphProps {
  volumeData?: VolumeRangeResponse;
}

export const VolumeGraph: React.FC<VolumeGraphProps> = ({ volumeData }) => {
  return <div>The volume data is {JSON.stringify(volumeData?.data.result)}</div>;
};
