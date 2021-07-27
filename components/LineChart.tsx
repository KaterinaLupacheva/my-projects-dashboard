import { useTheme } from '@material-ui/core';
import {
  CartesianGrid,
  Line,
  LineChart,
  LineProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  XAxisProps,
  YAxis,
} from 'recharts';

interface CustomLineChartProps {
  data: Record<string, unknown>[];
  lineDataKey: LineProps['dataKey'];
  xDataKey: XAxisProps['dataKey'];
}

const CustomLineChart = ({
  data,
  lineDataKey,
  xDataKey,
}: CustomLineChartProps): JSX.Element => {
  const theme = useTheme();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey={lineDataKey}
          stroke={theme.palette.secondary.contrastText}
          fill={theme.palette.secondary.contrastText}
          dot={{ r: 2 }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey={xDataKey} tick={{ fill: theme.palette.text.primary }} />
        <YAxis
          domain={['auto', 'auto']}
          tick={{ fill: theme.palette.text.primary }}
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
