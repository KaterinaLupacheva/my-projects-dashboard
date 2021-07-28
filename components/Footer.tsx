import { Box, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    padding: theme.spacing(3),
  },
  text: {
    color: theme.palette.primary.contrastText,
    flexGrow: 1,
  },
}));

function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="h6" align="center" className={classes.text}>
      {'Copyright © '}
      <Link color="inherit" href="https://ramonak.io/" target="_blank">
        ramonak.io
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Copyright />

      <Link
        href="https://github.com/KaterinaLupacheva/my-projects-dashboard"
        target="_blank"
      >
        <GitHubIcon color="secondary" fontSize="large" />
      </Link>
    </Box>
  );
};

export default Footer;
