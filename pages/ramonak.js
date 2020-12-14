import CustomHead from "../src/components/Head/head";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import BackDropWithSpinner from "../src/components/BackDropWithSpinner/backdrop-with-spinner.component";
import StatCard from "../src/components/StatCard/stat-card.component";
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
    const grouped = groupBy(SLUGS, "group");
    console.log(grouped);
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
    return mappedDocs;
  };

  const groupBy = (arr, property) => {
    return arr.reduce((acc, cur) => {
      acc[cur[property]] = [...(acc[cur[property]] || []), cur];
      return acc;
    }, {});
  };

  const docs = mapSlugs();
  // console.log(docs)

  return (
    <>
      <CustomHead title="Projects stats" />
      <Box width="100%">
        <Typography variant="h2" align="center" gutterBottom>
          |Blog posts Views count
        </Typography>
      </Box>

      <ViewsTable data={docs} />
    </>
  );
};

export default Ramonak;
