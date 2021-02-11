import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import CustomLineChart from "../Charts/LineChart.component";
import moment from "moment";

const useStyles = makeStyles(() => ({
  modal: {
    height: "50vh",
  },
}));

const BlogViewsDetails = ({ handleClose, open, data }) => {
  const classes = useStyles();
  const prepareViewsData = () => {
    let result = [];
    if (data.length === 1) {
      result.push(data[0]);
    } else if (data.length > 1 && data.length % 2 === 0) {
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

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="details-dialog"
      open={open}
      maxWidth="md"
      fullWidth
      classes={{ paper: classes.modal }}
    >
      <div style={{ height: "100%", width: "100%", padding: "50px 10px" }}>
        <CustomLineChart
          data={prepareViewsData()}
          lineDataKey="views"
          xDataKey="date"
        />
      </div>
    </Dialog>
  );
};

export default BlogViewsDetails;
