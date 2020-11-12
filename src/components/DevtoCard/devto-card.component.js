import Image from "next/image";
import Link from "next/link";
import Paper from "@ramonak/paper";
import "@ramonak/paper/dist/index.css";
import { Typography, Box, Hidden } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { timestampToDate } from "../../../utils/date-helpers";
import { makeStyles } from "@material-ui/core/styles";
import { devtoCardStyles } from "./devto-card.styles";

const useStyles = makeStyles(devtoCardStyles);

const DevtoCard = (props) => {
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
