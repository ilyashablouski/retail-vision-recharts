import { useState, MouseEvent, FC } from 'react';
import { ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';

import { Chart } from '@shared/model';
import { stringToUpperCase } from '@shared/utils';
import { ChartType } from '@shared/types';
import { getChartOptions } from '@widgets/ChartWidget/model/chartOptions';
import { CHART_TYPES } from '@/shared/types/chartTypes';
import ChartWrapper from '@shared/ui/ChartWrapper';

type ChartWidgetProps = Chart;

export const ChartWidget: FC<ChartWidgetProps> = ({ chartType, chartLabels, chartData }) => {
  const theme = useTheme();
  const [chartToggleType, setChartToggleType] = useState<ChartType>(chartType);

  const chartOptions = getChartOptions(chartToggleType, chartLabels, chartData, theme);

  const handleChartTypeChange = (_event: MouseEvent<HTMLElement>, newChartType: ChartType) => {
    if (newChartType !== null) {
      setChartToggleType(newChartType);
    }
  };

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <ToggleButtonGroup
          value={chartToggleType}
          exclusive
          onChange={handleChartTypeChange}
          aria-label="chart type"
          color="primary"
        >
          {CHART_TYPES.map((type) => (
            <ToggleButton key={type} value={type} aria-label={type}>
              {stringToUpperCase(type)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      <ChartWrapper options={chartOptions} />
    </>
  );
};

export default ChartWidget;
