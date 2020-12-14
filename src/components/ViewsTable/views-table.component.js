import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { viewsTableStyles } from "./views-table.styles";
import { daysRange } from "../../../utils/date-helpers";
import moment from "moment";

const useStyles = makeStyles(viewsTableStyles);

const ViewsTable = ({ data }) => {
  console.log(data);
  const lastSevenDaysRange = daysRange(moment().subtract(6, "days"), moment());

  const countThisWeekViews = (id) => {
    let views = 0;
    const row = data.find((item) => item._id === id);
    lastSevenDaysRange.forEach((date) => {
      const targetDate = row.viewsData?.find((d) => d.date === date);
      if (targetDate) {
        views += targetDate.views;
      }
    });
    return views;
  };
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Source</TableCell>
            <TableCell>Last 7 days views</TableCell>
            <TableCell>Total views</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.description}</TableCell>
              <TableCell>{countThisWeekViews(row._id)}</TableCell>
              <TableCell>{row.totalViews}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<OpenInNewIcon />}
                  //   onClick={() => setIsModalOpen(true)}
                >
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewsTable;
