import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

const Devto = () => {
  const { data, error } = useSWR("/api/devto", fetcher);
  if (error || data?.articles.status !== 200) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  // render data
  return <div>hello {data.articles[0].title}!</div>;
};

export default Devto;
