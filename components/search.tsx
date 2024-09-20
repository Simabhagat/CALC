import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { SearchIcon } from "./icons";
import { useSearch } from "@/hooks/useSearch";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // router.push(`/search?searchQuery=${encodeURIComponent(searchQuery)}`);
      router.push(`search/${searchQuery}`)
    }
  };

  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      value={searchQuery}
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  );
};
