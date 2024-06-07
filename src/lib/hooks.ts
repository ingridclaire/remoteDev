import { useState, useEffect } from "react";
import { base_url } from "./constants";
import { TJobItem } from "./types";

export function useJobItems(searchTerm: string) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
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

  return { jobItems, isLoading };
}
