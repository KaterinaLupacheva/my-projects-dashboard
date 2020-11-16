import { packages } from "../src/constants/npm-packages";
import NpmPackageCard from "../src/components/NpmPackageCard/npm-package-card.component";

const Npm = () => {
  return (
    <div>
      {packages.map((p, id) => (
        <NpmPackageCard packageName={p} key={id} />
      ))}
    </div>
  );
};

export default Npm;
