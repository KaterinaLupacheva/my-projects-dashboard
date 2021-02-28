import BallotIcon from '@material-ui/icons/Ballot';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DevicesIcon from '@material-ui/icons/Devices';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

import { IMenuItem } from '../types/general';
import * as ROUTES from './routes';

export const MENU_LIST_ITEMS: IMenuItem[] = [
  {
    name: 'ramonak.io',
    Icon: DashboardIcon,
    route: ROUTES.RAMONAK,
  },
  {
    name: 'dev.to',
    Icon: DevicesIcon,
    route: ROUTES.DEVTO,
  },
  {
    name: 'GitHub',
    Icon: GitHubIcon,
    route: ROUTES.GITHUB,
  },
  {
    name: 'Twitter',
    Icon: TwitterIcon,
    route: ROUTES.TWITTER,
  },
  {
    name: 'NPM packages',
    Icon: BallotIcon,
    route: ROUTES.NPM,
  },
];
