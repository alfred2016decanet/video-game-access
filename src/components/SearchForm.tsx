import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { CiSearch } from "react-icons/ci";

interface Props {
  searchValue: string;
  onSearch: (searchValue: string) => void;
}
const SearchForm = ({ onSearch }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (searchRef.current) onSearch(searchRef.current.value);
      }}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <CiSearch color="gray.300" />
        </InputLeftElement>
        <Input type="text" placeholder="search games..." ref={searchRef} />
      </InputGroup>
    </form>
  );
};

export default SearchForm;
