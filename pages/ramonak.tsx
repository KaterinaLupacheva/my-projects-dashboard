import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useSWR from 'swr';

import BackDropWithSpinner from '../components/BackdropWithSpinner';
import CustomHead from '../components/Head';
import ViewsTable from '../components/ViewsTable/ViewsTable';
import { GROUP, SLUGS } from '../constants/slugs';
import { DailyViews, IMappedDoc, IViews } from '../types/general';
import { fetcher } from '../utils/fetcher';

const Ramonak = (): JSX.Element => {
  const { data, error } = useSWR('/api/views', fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.docs) return <div>Error</div>;

  const mapSlugs = () => {
    let id = 0;
    const mappedDocs: IMappedDoc[] = [];

    SLUGS.forEach((obj) => {
      const doc = data.docs.find((d: IViews) => d.slug === obj.slug);
      if (doc) {
        mappedDocs.push({
          ...doc,
          published: obj.published,
          description: obj.description,
          group: obj.group,
        });
      } else {
        mappedDocs.push({
          ...obj,
          _id: id,
          totalViews: 0,
          viewsData: [] as DailyViews[],
        });
        id++;
      }
    });
    return groupBy(mappedDocs, 'group');
  };

  type ObjectKey = keyof Omit<IMappedDoc, 'published'>;

  const groupBy = (
    arr: IMappedDoc[],
    property: ObjectKey
  ): { [key in keyof typeof GROUP]: IMappedDoc[] } => {
    return arr.reduce((acc, cur) => {
      //@ts-ignore
      acc[cur[property]] = [...(acc[cur[property]] || []), cur];
      return acc;
    }, {} as { [key in keyof typeof GROUP]: IMappedDoc[] });
  };

  type MappedDocs = {
    [key in keyof typeof GROUP]: IMappedDoc[];
  };

  const docs: MappedDocs = mapSlugs();

  return (
    <Box width="100%">
      <CustomHead title="Projects stats" />
      <Typography variant="h3" align="center" gutterBottom>
        Blog posts Views count
      </Typography>
      <ViewsTable data={docs[GROUP.RAMONAK_BLOG]} />
      <Typography variant="h3" align="center" gutterBottom>
        NPM packages demos views
      </Typography>
      <ViewsTable data={docs[GROUP.NPM_PACKAGE]} />
    </Box>
  );
};

export default Ramonak;
