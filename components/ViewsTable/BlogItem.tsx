import { IconButton } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import moment from 'moment';
import { useState } from 'react';

import { IMappedDoc } from '../../types/general';
import BlogViewsDetails from '../BlogViewsDetails';
import WeekViews from './WeekViews';

interface BlogItemProps {
  row: IMappedDoc;
}

const BlogItem = ({ row }: BlogItemProps): JSX.Element => {
  const { published, description, thisWeekViews, change, totalViews } = row;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <TableCell>{moment(published).format('MMM DD, YYYY')}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>
        <WeekViews thisWeekViews={thisWeekViews} change={change} />
      </TableCell>
      <TableCell>{totalViews}</TableCell>
      <TableCell>
        <IconButton onClick={() => setIsModalOpen(true)} size="small">
          <OpenInNewIcon fontSize="small" color="secondary" />
        </IconButton>
      </TableCell>
      <BlogViewsDetails
        open={isModalOpen}
        handleClose={handleModalClose}
        data={row}
      />
    </>
  );
};

export default BlogItem;
