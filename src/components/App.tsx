import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import { base_url } from "../lib/constants";
import { TJobItem } from "../lib/types";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";

function App() {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${base_url}?search=${searchTerm}`);
        const data = await res.json();
        console.log(data);
        setJobItems(data.jobItems);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [searchTerm]);

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={jobItems} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
