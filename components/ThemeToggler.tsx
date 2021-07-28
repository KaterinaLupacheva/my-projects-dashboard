import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Brightness2 from '@material-ui/icons/Brightness2';
import WbSunny from '@material-ui/icons/WbSunny';
import React from 'react';

import { useThemeContext } from '../context/ThemeContext';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.primary.contrastText,
  },
}));
const ThemeToggler = (): JSX.Element => {
  const classes = useStyles();
  const { themeType, setThemeType } = useThemeContext();
  return (
    <IconButton
      onClick={() => setThemeType(themeType === 'dark' ? 'light' : 'dark')}
    >
      {themeType === 'dark' ? (
        <WbSunny />
      ) : (
        <Brightness2 className={classes.icon} />
      )}
    </IconButton>
  );
};

export default ThemeToggler;
