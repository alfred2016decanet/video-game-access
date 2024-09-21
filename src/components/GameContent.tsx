import { Box, Heading } from "@chakra-ui/react";
import GameFilters from "./GameFilters";
import { PlatForm } from "../services/platform-service";

interface Props {
  title: string;
  onSelectPlatform: (platform: PlatForm) => void;
  onSelectOrdering: (order: string) => void;
}

const GameContent = ({ title, onSelectPlatform, onSelectOrdering }: Props) => {
  return (
    <Box paddingLeft={2}>
      <Heading as="h1">{title} Games</Heading>
      <GameFilters
        onSelectPlatform={onSelectPlatform}
        onSelectOrdering={onSelectOrdering}
      />
    </Box>
  );
};

export default GameContent;
