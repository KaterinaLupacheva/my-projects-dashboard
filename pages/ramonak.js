import CustomHead from "../src/components/Head/head";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import BackDropWithSpinner from "../src/components/BackDropWithSpinner/backdrop-with-spinner.component";
import StatCard from "../src/components/StatCard/stat-card.component";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { SLUGS } from "../src/constants/slugs";

const Ramonak = () => {
  const { data, error } = useSWR("/api/views", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.docs) return <div>Error</div>;

  const mapSlugs = () => {
    let mappedDocs = [];
    SLUGS.forEach((obj) => {
      const newDoc = data.docs.find((doc) => doc.slug === obj.slug);
      mappedDocs.push({ ...newDoc, description: obj.description });
    });
    return mappedDocs;
  };

  const docs = mapSlugs();

  return (
    <>
      <CustomHead title="Projects stats" />
      <Box width="100%">
        <Typography variant="h2" align="center" gutterBottom>
          Views count
        </Typography>
      </Box>
      {docs.map((d) => (
        <StatCard
          key={d._id}
          value={d.views ? d.views : 0}
          title={d.description}
        />
      ))}
    </>
  );
};

export default Ramonak;
