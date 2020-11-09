import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ListAltIcon from "@material-ui/icons/ListAlt";

export const MENU_LIST_ITEMS = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    route: "/dashboard",
  },
  {
    name: "Orders",
    icon: <ListAltIcon />,
    route: "/orders",
  },
  {
    name: "Employees",
    icon: <PeopleIcon />,
    route: "/employees",
  },
  {
    name: "Products",
    icon: <ShoppingBasketIcon />,
    route: "/products",
  },
];
