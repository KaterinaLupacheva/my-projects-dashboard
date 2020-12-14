import CustomHead from "../src/components/Head/head";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import BackDropWithSpinner from "../src/components/BackDropWithSpinner/backdrop-with-spinner.component";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { SLUGS, RAMONAK_BLOG, NPM_PACKAGE } from "../src/constants/slugs";
import ViewsTable from "../src/components/ViewsTable/views-table.component";

const Ramonak = () => {
  const { data, error } = useSWR("/api/views", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.docs) return <div>Error</div>;

  const mapSlugs = () => {
    let id = 0;
    let mappedDocs = [];

    SLUGS.forEach((obj) => {
      const doc = data.docs.find((d) => d.slug === obj.slug);
      if (doc) {
        mappedDocs.push({
          ...doc,
          description: obj.description,
          group: obj.group,
        });
      } else {
        mappedDocs.push({ ...obj, _id: id, totalViews: 0 });
        id++;
      }
    });
    return groupBy(mappedDocs, "group");
  };

  const groupBy = (arr, property) => {
    return arr.reduce((acc, cur) => {
      acc[cur[property]] = [...(acc[cur[property]] || []), cur];
      return acc;
    }, {});
  };

  const docs = mapSlugs();

  return (
    <Box width="100%">
      <CustomHead title="Projects stats" />
      <Typography variant="h3" align="center" gutterBottom>
        Blog posts Views count
      </Typography>
      <ViewsTable data={docs[RAMONAK_BLOG]} />
      <Typography variant="h3" align="center" gutterBottom>
        NPM packages demos views
      </Typography>
      <ViewsTable data={docs[NPM_PACKAGE]} />
    </Box>
  );
};

export default Ramonak;
