

import { useMutation } from "@tanstack/react-query";
import { App } from "@/app/type";
const fetchAppDetail = async (app_id: string) : Promise<App> => {
  console.log("i am inside")
  const response = await fetch(`/api/apps?app_id=${app_id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const app = await response.json()
  return app;
};

export const useAppDetail = () => {
  return useMutation<App,Error, string>({
    mutationFn: fetchAppDetail,
    onError: (error) => {
      console.error("Search error:", error);
    },
  });
};
