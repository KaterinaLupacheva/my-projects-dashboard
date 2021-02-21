import '@ramonak/paper/dist/index.css';

import { Box, Hidden, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
//@ts-ignore
import Paper from '@ramonak/paper';
import Image from 'next/image';
import Link from 'next/link';

import { CustomTheme } from '../styles/CustomTheme';
import { IArticle } from '../types/general';
import { timestampToDate } from '../utils/date-helpers';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    textDecoration: 'none',
    color: CustomTheme.color.textPrimary,
    width: '100%',
  },
  rowContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  paddingSide: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

const DevtoCard = (props: IArticle): JSX.Element => {
  const {
    title,
    published_at,
    url,
    public_reactions_count,
    page_views_count,
    comments_count,
    cover_image,
    tag_list,
  } = props;
  const classes = useStyles();

  return (
    <Box m={2}>
      <Paper elevation={3}>
        <Link href={url}>
          <a className={classes.container} target="_blank">
            <Box p={1}>
              <Typography variant="h6" align="center">
                {title}
              </Typography>

              <div className={classes.rowContainer}>
                <div className={classes.column}>
                  <div className={classes.row}>
                    <Typography variant="subtitle2">
                      Published: &nbsp;
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {timestampToDate(published_at)}
                    </Typography>
                  </div>
                  <div className={classes.row}>
                    <VisibilityIcon fontSize="small" />
                    <Typography className={classes.paddingSide}>
                      {page_views_count}
                    </Typography>
                    <FavoriteBorderIcon fontSize="small" />
                    <Typography className={classes.paddingSide}>
                      {public_reactions_count}
                    </Typography>
                    <ChatBubbleOutlineIcon fontSize="small" />
                    <Typography className={classes.paddingSide}>
                      {comments_count}
                    </Typography>
                  </div>
                  <div className={classes.row}>
                    {tag_list.map((tag, i) => (
                      <Typography variant="caption" key={i}>
                        {`#${tag}`}&nbsp;
                      </Typography>
                    ))}
                  </div>
                </div>
                <Hidden xsDown>
                  {cover_image && (
                    <Image
                      src={cover_image}
                      alt="Article image"
                      width={200}
                      height={113}
                    />
                  )}
                </Hidden>
              </div>
            </Box>
          </a>
        </Link>
      </Paper>
    </Box>
  );
};

export default DevtoCard;
