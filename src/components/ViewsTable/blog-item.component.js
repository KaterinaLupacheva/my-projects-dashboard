import { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import WeekViews from "./week-views.component";
import BlogViewsDetails from "../BlogViewsDetails/blog-views-details.component";

import moment from "moment";

const BlogItem = ({ row, ...otherProps }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  console.table(row);
  return (
    <>
      <TableCell>{moment(row.published).format("MMM DD, YYYY")}</TableCell>
      <TableCell>{row.description}</TableCell>
      <TableCell>
        <WeekViews {...otherProps} />
      </TableCell>
      <TableCell>{row.totalViews}</TableCell>
      <TableCell>
        <Button
          size="small"
          variant="contained"
          endIcon={<OpenInNewIcon />}
          onClick={() => setIsModalOpen(true)}
        >
          Details
        </Button>
      </TableCell>
      <BlogViewsDetails open={isModalOpen} handleClose={handleModalClose} />
    </>
  );
};

export default BlogItem;
