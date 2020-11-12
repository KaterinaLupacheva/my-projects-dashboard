import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import BackDropWithSpinner from "../src/components/BackDropWithSpinner/backdrop-with-spinner.component";
import DevtoCard from "../src/components/DevtoCard/devto-card.component";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

const Devto = () => {
  const { data, error } = useSWR("/api/devto", fetcher);
  const [sortedArticles, setSortedArticles] = useState(null);
  const [sortType, setSortType] = useState("date");

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        date: "published_at",
        views: "page_views_count",
        likes: "public_reactions_count",
        comments: "comments_count",
      };
      const sortProperty = types[type];
      const artArr = data.articles;
      const sorted = [...artArr].sort(
        (a, b) => b[sortProperty] - a[sortProperty]
      );
      setSortedArticles(sorted);
    };

    data && sortArray(sortType);
  }, [sortType]);

  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.articles) return <div>Error</div>;

  const renderArticles = (articles) => {
    return (
      <div>
        {articles.map((article) => (
          <DevtoCard {...article} key={article.id} />
        ))}
      </div>
    );
  };

  console.log(sortedArticles);
  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Sort by</FormLabel>
        <RadioGroup
          row
          aria-label="sort"
          name="sorted-articles"
          value={sortType}
          onChange={(event) => setSortType(event.target.value)}
        >
          <FormControlLabel
            value="date"
            control={<Radio />}
            label="Published Date"
          />
          <FormControlLabel value="views" control={<Radio />} label="Views" />
          <FormControlLabel
            value="likes"
            control={<Radio />}
            label="Reactions"
          />
          <FormControlLabel
            value="comments"
            control={<Radio />}
            label="Comments"
          />
        </RadioGroup>
      </FormControl>
      {sortedArticles
        ? renderArticles(sortedArticles)
        : renderArticles(data.articles)}
    </div>
  );
};

export default Devto;
