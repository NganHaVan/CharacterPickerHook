import { useState, useEffect } from "react";

// Custom hook
export const useHttp = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  /**
   * fetch("https://swapi.co/api/people")
   */
  useEffect(() => {
    console.log("Is fetching data");
    setIsLoading(true);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then(charData => {
        setIsLoading(false);
        setFetchedData(charData);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, dependencies);
  return [isLoading, fetchedData];
};
