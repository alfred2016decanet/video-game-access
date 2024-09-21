import {
  Badge,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
} from "@chakra-ui/react";
import { Game } from "../services/game-service";
import PlatformIconList from "./PlatformIconList";
import Emoji from "./Emoji";

const GameCard = ({ game }: { game: Game }) => {
  return (
    <Card>
      <Image src={game.background_image} />
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <PlatformIconList
            platforms={game.platforms?.map((p) => p.platform)}
          />
          <Badge
            colorScheme={
              game.metacritic > 75
                ? "green"
                : game.metacritic > 60
                ? "yellow"
                : ""
            }
            fontSize="14px"
            paddingX={2}
            borderRadius="4px"
          >
            {game.metacritic}
          </Badge>
        </HStack>
        <Heading fontSize="2xl">
          {game.name}
          <Emoji rating={game.rating_top} />
        </Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
