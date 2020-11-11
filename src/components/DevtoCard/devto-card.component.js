import Image from "next/image";
import Link from "next/link";
import Paper from "@ramonak/paper";
import "@ramonak/paper/dist/index.css";
import { Typography } from "@material-ui/core";
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
    cover_image,
    tag_list,
  } = props;
  const classes = useStyles();

  return (
    <Paper elevation={3}>
      <Link href={url}>
        <a className={classes.container}>
          <Typography variant="h6" align="center">
            {title}
          </Typography>
          <div className={classes.row}>
            <Typography variant="subtitle2">Published: &nbsp;</Typography>
            <Typography variant="body2" color="textSecondary">
              {timestampToDate(published_at)}
            </Typography>
          </div>
          <p>{public_reactions_count}</p>
          <p>{page_views_count}</p>
          {cover_image && (
            <Image
              src={cover_image}
              alt="Picture of the author"
              width={200}
              height={113}
            />
          )}
          {tag_list.map((tag, i) => (
            <p key={i}>{tag}</p>
          ))}
        </a>
      </Link>
    </Paper>
  );
};

export default DevtoCard;
