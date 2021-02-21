import { Box, Typography } from '@material-ui/core';

import CustomHead from '../src/components/Head/head';
import NpmPackageCard from '../src/components/NpmPackageCard/npm-package-card.component';
import { packages } from '../src/constants/npm-packages';

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
