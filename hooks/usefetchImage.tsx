import { useMutation } from "@tanstack/react-query";
import { Image } from "@/app/type";

const fetchImages = async (app_id: string) : Promise<Image[]> => {
  const response = await fetch(`/api/images?app_id=${encodeURIComponent(app_id)}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const usefetchImage = () => {
  return useMutation<Image[],Error, string>({
    mutationFn: fetchImages,
    onError: (error) => {
      console.error("Search error:", error);
    },
  });
};
