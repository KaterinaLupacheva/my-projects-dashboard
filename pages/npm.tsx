import { Box, Grid, Typography } from '@material-ui/core';

import CustomHead from '../components/Head';
import NpmPackageCard from '../components/NpmPackageCard';
import { packages } from '../constants/npm-packages';

const Npm = (): JSX.Element => {
  return (
    <>
      <CustomHead title="NPM stats" />
      <Box style={{ width: '100%' }}>
        <Typography variant="h3" align="center" gutterBottom>
          NPM packages
        </Typography>
        <Grid container spacing={3}>
          {packages.map((p, id) => (
            <Grid item key={id} xs={12}>
              <NpmPackageCard packageName={p} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Npm;
