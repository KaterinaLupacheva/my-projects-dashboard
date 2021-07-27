import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#243354',
      light: '#8C94AC',
      dark: '#162036',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#E13D4E',
    },
    text: {
      primary: '#243354',
      secondary: '#000',
    },
    background: {
      default: '#edf0f2',
      paper: '#fff',
    },
    divider: '#A4A6B3',
  },
});

export default theme;

export const drawerWidth = 240;

export const rightDrawerWidth = 300;
