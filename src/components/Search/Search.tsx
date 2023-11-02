import { ChangeEvent } from "react";
import Input from "../../ui/Input/Input";
import { SearchProps } from "./SearchProps";

const Search = ({ search, handleSearch }: SearchProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSearch(value);
  };
  return (
    <Input
      type="text"
      placeholder="Type coin  name..."
      value={search}
      searchChange={handleChange}
    />
  );
};

export default Search;
