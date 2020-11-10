import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import BackDropWithSpinner from "../src/components/BackDropWithSpinner/backdrop-with-spinner.component";

const Devto = () => {
  const { data, error } = useSWR("/api/devto", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.articles) return <div>Error</div>;

  // render data
  return <div>hello {data.articles[0].title}!</div>;
};

export default Devto;
