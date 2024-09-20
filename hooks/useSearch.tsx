import { useMutation } from "@tanstack/react-query";
import { App } from "@/app/type";

const fetchSearchResults = async (searchQuery: string) : Promise<App[]> => {
  const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  console.log("fetch request received and handled: " + response)
  return response.json();
};

export const useSearch = () => {
  return useMutation<App[],Error, string>({
    mutationFn: fetchSearchResults,
    onError: (error) => {
      console.error("Search error:", error);
    },
  });
};
