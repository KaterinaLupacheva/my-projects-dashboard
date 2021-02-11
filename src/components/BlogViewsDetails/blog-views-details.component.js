import Dialog from "@material-ui/core/Dialog";
import moment from "moment";

const BlogViewsDetails = ({ handleClose, open, data }) => {
  console.log(data);

  const prepareViewsData = () => {
    let result = [];
    if (data.length > 1) {
      for (let i = 0; i < data.length; i += 2) {
        const el1 = data[i];
        const el2 = data[i + 1];
        result.push(el1);
        let start = moment(el1.date, "DD-MM-YYYY").format("YYYY-MM-DD");

        const end = moment(el2.date, "DD-MM-YYYY");
        let tempDate = moment(start).add(1, "days");
        while (tempDate.isBetween(start, end)) {
          result.push({
            date: tempDate.format("DD-MM-YYYY"),
            views: 0,
          });
          tempDate.add(1, "days");
        }
        result.push(el2);
      }
    } else {
      result = data;
    }
    return result;
  };

  const res = prepareViewsData();

  return (
    <Dialog onClose={handleClose} aria-labelledby="details-dialog" open={open}>
      <div>dialog</div>
    </Dialog>
  );
};

export default BlogViewsDetails;
