import Image from "next/image";
import Form from "../components/form";
import Loader from "../components/loader";
import Notice from "../components/notice";
import Header from "../components/header";

export default function Home() {
  const isDatabricksAvailable = process.env.REACT_APP_DATABRICKS_AVAILABLE
  return (
    <main>
      <Header/>
      <Form/>
      {
        +!isDatabricksAvailable ? (
          <Notice/>
        ): (
          <></>
        )
      }
    </main>
  );
}
