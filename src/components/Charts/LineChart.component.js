import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomLineChart = ({ data, lineDataKey, xDataKey }) => (
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
