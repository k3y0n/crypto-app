import { ChangeEvent } from "react";
import Input from "../../ui/Input/Input";
import { SearchProps } from "./SearchProps";
import _ from "lodash";

const Search: React.FC<SearchProps> = ({ search, handleSearch }) => {
  const handleChange = _.debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSearch(value);
  }, 300);
  return (
    <Input
      type="text"
      placeholder="search by coin  name"
      value={search}
      searchChange={handleChange}
    />
  );
};

export default Search;
