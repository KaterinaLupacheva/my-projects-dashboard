import { Box, Typography } from '@material-ui/core';

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

        {packages.map((p, id) => (
          <NpmPackageCard packageName={p} key={id} />
        ))}
      </Box>
    </>
  );
};

export default Npm;
