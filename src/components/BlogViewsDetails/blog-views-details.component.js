import Dialog from "@material-ui/core/Dialog";

const BlogViewsDetails = ({ handleClose, open }) => {
  return (
    <Dialog onClose={handleClose} aria-labelledby="details-dialog" open={open}>
      <div>dialog</div>
    </Dialog>
  );
};

export default BlogViewsDetails;
