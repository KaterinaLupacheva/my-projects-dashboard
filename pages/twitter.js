import CustomHead from "../src/components/Head/head";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import BackDropWithSpinner from "../src/components/BackDropWithSpinner/backdrop-with-spinner.component";
import StatsCard from "../src/components/StatCard/stat-card.component";

const Twitter = () => {
  const { data, error } = useSWR("/api/twitter", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.followers) return <div>Error</div>;

  return (
    <div>
      <CustomHead title="Twitter stats" />
      <StatsCard title="Followers" value={data.followers.ids.length} />
    </div>
  );
};

export default Twitter;
