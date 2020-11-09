import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ListAltIcon from "@material-ui/icons/ListAlt";

export const MENU_LIST_ITEMS = [
  {
    name: "ramonak.io",
    icon: <DashboardIcon />,
    route: "/ramonak",
  },
  {
    name: "dev.to",
    icon: <ListAltIcon />,
    route: "/devto",
  },
  {
    name: "GitHub",
    icon: <PeopleIcon />,
    route: "/github",
  },
  {
    name: "Twitter",
    icon: <ShoppingBasketIcon />,
    route: "/twitter",
  },
];
