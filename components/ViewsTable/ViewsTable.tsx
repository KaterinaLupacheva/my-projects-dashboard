import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import React from 'react';

import { IMappedDoc } from '../../types/general';
import BlogItem from './BlogItem';

type SortableProps = 'published' | 'thisWeekViews' | 'totalViews';

function descendingComparator(
  a: IMappedDoc,
  b: IMappedDoc,
  orderBy: SortableProps
) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator(
  order: Order,
  orderBy: SortableProps
): (a: IMappedDoc, b: IMappedDoc) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface SortableHeadCell {
  id: SortableProps;
  label: string;
}

const headCells: SortableHeadCell[] = [
  {
    id: 'published',
    label: 'Published',
  },
  {
    id: 'thisWeekViews',
    label: 'Last 7 days views',
  },
  {
    id: 'totalViews',
    label: 'Total views',
  },
];

interface EnhancedSortableHeadCellProps {
  headCell: SortableHeadCell;
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: SortableHeadCell['id']
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedSortableHeadCell(props: EnhancedSortableHeadCellProps) {
  const { headCell, order, orderBy, onRequestSort, classes } = props;
  const createSortHandler = (property: SortableHeadCell['id']) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };
  return (
    <TableCell
      key={headCell.id}
      sortDirection={orderBy === headCell.id ? order : false}
    >
      <TableSortLabel
        active={orderBy === headCell.id}
        direction={orderBy === headCell.id ? order : 'asc'}
        onClick={createSortHandler(headCell.id)}
      >
        {headCell.label}
        {orderBy === headCell.id ? (
          <span className={classes.visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </span>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
}

interface TableHeadWithSortingProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: SortableHeadCell['id']
  ) => void;
  order: Order;
  orderBy: string;
}

function TableHeadWithSorting(props: TableHeadWithSortingProps) {
  return (
    <TableHead>
      <TableRow>
        <EnhancedSortableHeadCell headCell={headCells[0]} {...props} />
        <TableCell>Title</TableCell>
        <EnhancedSortableHeadCell headCell={headCells[1]} {...props} />
        <EnhancedSortableHeadCell headCell={headCells[2]} {...props} />
        <TableCell>Details</TableCell>
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })
);

interface ViewsTableProps {
  data: IMappedDoc[];
  withPagination?: boolean;
}

export default function EnhancedTable({
  data,
  withPagination = false,
}: ViewsTableProps): JSX.Element {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<SortableProps>('thisWeekViews');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: SortableProps
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={5}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <TableHeadWithSorting
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row._id}>
                      <BlogItem row={row} />
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {withPagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </div>
  );
}
