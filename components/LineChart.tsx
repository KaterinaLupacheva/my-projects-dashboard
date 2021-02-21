import {
  CartesianGrid,
  DataKey,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface CustomLineChartProps {
  data: ReadonlyArray<Record<string, unknown>>;
  lineDataKey: DataKey;
  xDataKey: DataKey;
}

const CustomLineChart = ({
  data,
  lineDataKey,
  xDataKey,
}: CustomLineChartProps): JSX.Element => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <Line type="monotone" dataKey={lineDataKey} stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey={xDataKey} />
      <YAxis />
      <Tooltip />
    </LineChart>
  </ResponsiveContainer>
);

export default CustomLineChart;
