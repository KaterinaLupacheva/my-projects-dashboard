import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

import { daysRange } from '../../utils/date-helpers';
import BlogItem from './blog-item.component';
import { viewsTableStyles } from './views-table.styles';

const useStyles = makeStyles(viewsTableStyles);

const ViewsTable = ({ data }) => {
  const classes = useStyles();
  const lastSevenDaysRange = daysRange(moment().subtract(6, 'days'), moment());
  const prevSevenDaysRange = daysRange(
    moment().subtract(13, 'days'),
    moment().subtract(7, 'days')
  );
  const countViews = (id, range) => {
    let views = 0;
    const row = data.find((item) => item._id === id);
    range.forEach((date) => {
      const targetDate = row.viewsData?.find((d) => d.date === date);
      if (targetDate) {
        views += targetDate.views;
      }
    });
    return views;
  };

  const viewsComparison = (id) => {
    const thisWeekViews = countViews(id, lastSevenDaysRange);
    const prevWeekViews = countViews(id, prevSevenDaysRange);
    const change =
      prevWeekViews !== 0 ? (thisWeekViews / prevWeekViews - 1) * 100 : 0;
    return { thisWeekViews, change };
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Published</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Last 7 days views</TableCell>
              <TableCell>Total views</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <BlogItem row={row} {...viewsComparison(row._id)} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ViewsTable;
