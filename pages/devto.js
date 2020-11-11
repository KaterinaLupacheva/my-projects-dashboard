import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import BackDropWithSpinner from "../src/components/BackDropWithSpinner/backdrop-with-spinner.component";
import DevtoCard from "../src/components/DevtoCard/devto-card.component";

const Devto = () => {
  const { data, error } = useSWR("/api/devto", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.articles) return <div>Error</div>;

  return (
    <div>
      {data.articles.map((article) => (
        <DevtoCard {...article} key={article.id} />
      ))}
    </div>
  );
};

export default Devto;
