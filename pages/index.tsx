import CustomHead from '../src/components/Head/head';
import Ramonak from './ramonak';

export default function Home(): JSX.Element {
  return (
    <>
      <CustomHead title="Dashboard" />
      <Ramonak />
    </>
  );
}
