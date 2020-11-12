import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import BackDropWithSpinner from "../src/components/BackDropWithSpinner/backdrop-with-spinner.component";
import GithubUserInfo from "../src/components/GithubUserInfo/github-user-info.component";

const GitHub = () => {
  const { data, error } = useSWR("/api/github", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.user) return <div>Error</div>;

  return (
    // <div>
      <GithubUserInfo {...data.user}/>
    // </div>
  );
};

export default GitHub;
