import DashboardIcon from "@material-ui/icons/Dashboard";
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import DevicesIcon from '@material-ui/icons/Devices';

export const MENU_LIST_ITEMS = [
  {
    name: "ramonak.io",
    icon: <DashboardIcon />,
    route: "/ramonak",
  },
  {
    name: "dev.to",
    icon: <DevicesIcon />,
    route: "/devto",
  },
  {
    name: "GitHub",
    icon: <GitHubIcon />,
    route: "/github",
  },
  {
    name: "Twitter",
    icon: <TwitterIcon />,
    route: "/twitter",
  },
];
