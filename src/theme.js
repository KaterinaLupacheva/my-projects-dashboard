import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
      grey: "#A4A6B3",
      selected: "#DDE2FF",
    },
    secondary: {
      main: '#db1362',
    },
    // error: {
    //   main: red.A400,
    // },
    background: {
      default: "#fff",
      dark: "#363740",
      selected: "#6B6C72",
    },
  },
});

export default theme;

export const drawerWidth = 240;

export const rightDrawerWidth = 300;
