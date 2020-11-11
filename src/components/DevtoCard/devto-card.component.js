import Image from "next/image";
import Paper from "@ramonak/paper";
import "@ramonak/paper/dist/index.css";
import { Typography } from "@material-ui/core";

const DevtoCard = (props) => {
  const {
    id,
    title,
    published_at,
    url,
    public_reactions_count,
    page_views_count,
    cover_image,
    tag_list,
  } = props;

  const published = new Date(published_at);

  return (
    <Paper elevation={3}>
      <Typography variant="h6">{title}</Typography>
      <p>{published}</p>
      <p>{url}</p>
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
    </Paper>
  );
};

export default DevtoCard;
