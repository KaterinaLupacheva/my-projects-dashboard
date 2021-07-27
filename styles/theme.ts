import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#243354',
      // grey: '#A4A6B3',
      // selected: '#DDE2FF',
    },
    secondary: {
      main: '#E13D4E',
    },
    // textPrimary: 'rgba(0, 0, 0, 0.87)',
    // error: {
    //   main: red.A400,
    // },
    background: {
      default: '#edf0f2',
      paper: '#fff',
      // dark: '#363740',
      // selected: '#6B6C72',
    },
  },
});

export default theme;

export const drawerWidth = 240;

export const rightDrawerWidth = 300;
