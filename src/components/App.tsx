import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import { base_url } from "../lib/constants";
import { TJobItem } from "../lib/types";

function App() {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchTerm) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`${base_url}?search=${searchTerm}`);
        const data = await res.json();
        console.log(data);
        setJobItems(data.jobItems);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [searchTerm]);

  return (
    <>
      <Background />
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Container jobItems={jobItems} />
      <Footer />
    </>
  );
}

export default App;
