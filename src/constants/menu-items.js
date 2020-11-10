import DashboardIcon from "@material-ui/icons/Dashboard";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import DevicesIcon from "@material-ui/icons/Devices";
import BallotIcon from "@material-ui/icons/Ballot";
import * as ROUTES from "./routes";

export const MENU_LIST_ITEMS = [
  {
    name: "ramonak.io",
    icon: <DashboardIcon />,
    route: ROUTES.RAMONAK,
  },
  {
    name: "dev.to",
    icon: <DevicesIcon />,
    route: ROUTES.DEVTO,
  },
  {
    name: "GitHub",
    icon: <GitHubIcon />,
    route: ROUTES.GITHUB,
  },
  {
    name: "Twitter",
    icon: <TwitterIcon />,
    route: ROUTES.TWITTER,
  },
  {
    name: "NPM packages",
    icon: <BallotIcon />,
    route: ROUTES.NPM,
  },
];
