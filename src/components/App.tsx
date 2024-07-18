import { useState, useEffect } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { useJobItems, useActiveId, useJobItem } from "../lib/hooks";
import { base_url } from "../lib/constants";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobItems, isLoading] = useJobItems(searchTerm);
  const activeId = useActiveId();
  const [jobItem, isLoadingJobItem] = useJobItem(activeId);

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
        <JobItemContent jobItem={jobItem} />
      </Container>
      <Footer />
    </>
  );
}

export default App;
