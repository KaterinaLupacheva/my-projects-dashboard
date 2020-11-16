import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import BackDropWithSpinner from "../BackDropWithSpinner/backdrop-with-spinner.component";

const NpmPackageCard = (props) => {
  const { packageName } = props;
  const { data, error } = useSWR(`/api/npm/${packageName}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.downloads) return <div>Error</div>;

  return <>{data.downloads.package}</>;
};

export default NpmPackageCard;
