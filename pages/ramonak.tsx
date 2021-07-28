import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useSWR from 'swr';

import BackDropWithSpinner from '../components/BackdropWithSpinner';
import ErrorPage from '../components/ErrorPage';
import CustomHead from '../components/Head';
import ViewsTable from '../components/ViewsTable/ViewsTable';
import { GROUP } from '../constants/slugs';
import { IMappedDoc } from '../types/general';
import { fetcher } from '../utils/fetcher';
import { mapSlugs } from '../utils/table-data';

type MappedDocs = {
  [key in keyof typeof GROUP]: IMappedDoc[];
};

const Ramonak = (): JSX.Element => {
  const { data, error } = useSWR('/api/views', fetcher);

  if (error) return <ErrorPage />;
  if (!data) return <BackDropWithSpinner open={true} />;

  const docs: MappedDocs = mapSlugs(data);

  return (
    <Box width="100%">
      <CustomHead title="Projects stats" />
      <Typography variant="h3" align="center" gutterBottom>
        Blog posts Views count
      </Typography>
      <ViewsTable data={docs[GROUP.RAMONAK_BLOG]} withPagination />
      <Box margin={5} />
      <Typography variant="h3" align="center" gutterBottom>
        NPM packages demos views
      </Typography>
      <ViewsTable data={docs[GROUP.NPM_PACKAGE]} />
      <Box margin={5} />
      <Typography variant="h3" align="center" gutterBottom>
        Apps views
      </Typography>
      <ViewsTable data={docs[GROUP.APP]} />
    </Box>
  );
};

export default Ramonak;
