import { useState, useEffect } from "react";
import { base_url } from "./constants";
import { TJobItem, TJobItemDetails } from "./types";

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveId(parseInt(window.location.hash.slice(1)));
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
}

export function useJobItem(id: number | null) {
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

  return { jobItem, isLoadingJobItem } as const;
}

export function useJobItems(searchTerm: string) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalNumberOfJobItems = jobItems.length;
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

  return { jobItemsSliced, isLoading, totalNumberOfJobItems } as const;
}

export function useDebounce(value, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}
