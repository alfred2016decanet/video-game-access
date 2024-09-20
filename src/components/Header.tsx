import {
  InputGroup,
  InputLeftElement,
  Input,
  Stack,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import reactLogo from "../assets/react.svg";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Stack align="center" direction="row">
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>

      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <CiSearch color="gray.300" />
        </InputLeftElement>
        <Input type="tel" placeholder="search games..." />
      </InputGroup>
      <Switch
        isChecked={colorMode === "dark" ? true : false}
        onChange={toggleColorMode}
      ></Switch>
      <Text>dark mode</Text>
    </Stack>
  );
};

export default Header;
