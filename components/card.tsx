"use client";

import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { useSearch } from "@/hooks/useSearch";
interface CardProps {
  category: string ; // Use category as a prop
}

export const CardComponent: React.FC<CardProps> = ({ category }) => {
  const [searchQuery, setSearchQuery] = useState(category);
  const { mutate: search, data: apps = [], status, error = "" } = useSearch();

  useEffect(() => {
    search(searchQuery);
  }, [searchQuery, search]);

  const router = useRouter();

  if (status === "pending") return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-[900px] px-8">
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {apps?.map((app) => (
          <Card key={app.app_id} className="h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <h4 className="text-black font-medium text-2xl">{app.app_name}</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt={`${app.app_name} background`}
              className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
              src={app.app_icon || "https://nextui.org/images/card-example-6.jpeg"}
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <p className="text-black text-tiny">Available</p>
                <p className="text-black text-tiny">{app.apk_size ? `${app.apk_size} MB` : "Unknown Size"}</p>
              </div>
              <Button
                className="text-tiny"
                color="primary"
                radius="full"
                size="sm"
                onClick={() => router.push(`/category/${app.app_id}`)}
              >
                Click here
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
