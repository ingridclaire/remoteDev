import { useState, useEffect } from "react";
import { base_url } from "./constants";
import { TJobItem, TJobItemDetails } from "./types";

export function useActiveId() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveId(window.location.hash.slice(1));
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
}

export function useJobItem(id: string | null) {
  const [jobItem, setJobItem] = useState<TJobItemDetails | null>(null);
  const [isLoadingJobItem, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${base_url}/${id}`);
        const data = await res.json();
        setJobItem(data.jobItem);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    if (!id) return;
    fetchData();
  }, [id]);

  return [jobItem, isLoadingJobItem] as const;
}

export function useJobItems(searchTerm: string) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);

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

  return [jobItemsSliced, isLoading] as const;
}
