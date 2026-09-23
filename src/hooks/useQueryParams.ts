import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";

export function useQueryParams() {
  const [location, setLocation] = useLocation();
  const searchString = useSearch();

  const params = new URLSearchParams(searchString);

  const getParam = (key: string) => params.get(key) || "";

  const setParam = (key: string, value: string | null | undefined) => {
    const currentParams = new URLSearchParams(searchString);

    if (value) {
      currentParams.set(key, value);
    } else {
      currentParams.delete(key);
    }

    const query = currentParams.toString();
    setLocation(`${location.split("?")[0]}${query ? `?${query}` : ""}`);
  };

  const setParams = (newParams: Record<string, string | null | undefined>) => {
    const currentParams = new URLSearchParams(searchString);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        currentParams.set(key, value);
      } else {
        currentParams.delete(key);
      }
    });

    const query = currentParams.toString();
    setLocation(`${location.split("?")[0]}${query ? `?${query}` : ""}`);
  };

  const useDebouncedParam = (key: string, delay: number = 300) => {
    const [value, setValue] = useState(getParam(key));
    const [debouncedValue] = useDebouncedValue(value, delay);

    useEffect(() => {
      setParam(key, debouncedValue || null);
    }, [debouncedValue, key]);

    return [value, setValue] as const;
  };

  const clearParams = () => {
    setLocation(location.split("?")[0]);
  };

  return {
    params,
    getParam,
    setParam,
    setParams,
    clearParams,
    useDebouncedParam,
  };
}
