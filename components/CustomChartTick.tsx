import { makeStyles, useTheme } from '@material-ui/core';
import { Tooltip as MUTooltip } from '@material-ui/core';

import { useArticlesContext } from '../context/ArticlesContext';
import { getDate } from '../utils/date-helpers';

const useStyles = makeStyles(() => ({
  circle: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const CustomChartTick = (props: any) => {
  const { x, y, payload } = props;
  const theme = useTheme();
  const classes = useStyles();
  const { articles } = useArticlesContext();

  const article = articles.find(
    (a) => getDate(a.published_at) === payload.value
  );

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill={theme.palette.text.primary}
      >
        {payload.value}
      </text>
      {article && (
        <MUTooltip title="Post">
          <circle
            cx="0"
            cy="40"
            r="10"
            fill={theme.palette.secondary.main}
            onClick={() => console.log('click')}
            className={classes.circle}
          />
        </MUTooltip>
      )}
    </g>
  );
};

export default CustomChartTick;
