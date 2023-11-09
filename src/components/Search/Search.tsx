import { useCallback,memo } from "react";
import { ChangeEvent } from "react";
import { SearchProps } from "./SearchProps";
import Input from "../Input/Input";

const Search = ({ search, handleSearch }: SearchProps) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      handleSearch(value);
    },
    [search]
  );
  return (
    <Input
      type="text"
      placeholder="Type coin  name..."
      value={search}
      searchChange={handleChange}
    />
  );
};

export default memo(Search);
