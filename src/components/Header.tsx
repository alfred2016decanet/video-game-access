import { Stack, Switch, Text, useColorMode } from "@chakra-ui/react";
import reactLogo from "../assets/react.svg";
import SearchForm from "./SearchForm";

interface Props {
  onSearch: (searchValue: string) => void;
}

const Header = ({ onSearch }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Stack align="center" direction="row">
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>

      <SearchForm onSearch={onSearch} />

      <Switch
        isChecked={colorMode === "dark" ? true : false}
        onChange={toggleColorMode}
      ></Switch>
      <Text>dark mode</Text>
    </Stack>
  );
};

export default Header;
