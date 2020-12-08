import CustomHead from "../src/components/Head/head";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import BackDropWithSpinner from "../src/components/BackDropWithSpinner/backdrop-with-spinner.component";

const Ramonak = () => {
  const { data, error } = useSWR("/api/views", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <BackDropWithSpinner open={true} />;
  if (!data.docs) return <div>Error</div>;

  console.log(data.docs);

  return (
    <div>
      <CustomHead title="Project stats" />
      Ramonak
    </div>
  );
};

export default Ramonak;
