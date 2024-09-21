import { useEffect, useState } from "react";
import PlatformService, { PlatForm } from "../services/platform-service";
import { CanceledError } from "axios";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  onSelectPlatform: (platform: PlatForm) => void;
  onSelectOrdering: (order: string) => void;
}

const GameFilters = ({ onSelectPlatform, onSelectOrdering }: Props) => {
  const [currentOrdering, setCurrentOrdering] = useState("");
  const [currentPlatform, setCurrentPlatform] = useState<PlatForm | null>(null);
  const [platforms, setPlaforms] = useState<PlatForm[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const sortOrders = [
    { value: "", label: "Relevance" },
    { value: "-added", label: "Date added" },
    { value: "name", label: "Name" },
    { value: "-released", label: "Release date" },
    { value: "-metacritic", label: "Popularity" },
    { value: "-rating", label: "Average rating" },
  ];

  useEffect(() => {
    const { request, cancel } = PlatformService.getAll<PlatForm>();
    request
      .then((response) => {
        setPlaforms(response.data.results);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setErrorMessage(error.message);
      });

    return () => cancel();
  }, []);

  if (errorMessage) return null;
  return (
    <Flex marginBottom={5}>
      <Box marginRight={5}>
        <Menu>
          <MenuButton as={Button} rightIcon={<BsChevronDown />}>
            {currentPlatform?.name || "Platforms"}
          </MenuButton>
          <MenuList>
            {platforms.map((platform) => (
              <MenuItem
                onClick={() => {
                  setCurrentPlatform({ ...platform });
                  onSelectPlatform(platform);
                }}
                key={platform.id}
              >
                {platform.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
      <Box>
        <Menu>
          <MenuButton as={Button} rightIcon={<BsChevronDown />}>
            Order by: {currentOrdering || "Relevance"}
          </MenuButton>
          <MenuList>
            {sortOrders.map((order) => (
              <MenuItem
                onClick={() => {
                  setCurrentOrdering(order.value);
                  onSelectOrdering(order.value);
                }}
                key={order.value}
                value={order.value}
              >
                {order.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default GameFilters;
