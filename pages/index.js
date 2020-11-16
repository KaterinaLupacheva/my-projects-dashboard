import Head from "next/head";
import styles from "../styles/Home.module.css";
import Button from "@material-ui/core/Button";
import Ramonak from "./ramonak";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Ramonak />
    </>
  );
}
