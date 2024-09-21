import { Box, Button, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import GameFilters from "./GameFilters";
import { PlatForm } from "../services/platform-service";
import { useEffect, useState } from "react";
import GameService, { Game, GameQueryVars } from "../services/game-service";
import GameCard from "./GameCard";
import { CanceledError } from "axios";

interface Props {
  gameQuery: GameQueryVars;
  onSelectPlatform: (platform: PlatForm) => void;
  onSelectOrdering: (order: string) => void;
  onLoadMore: () => void;
}

const GameContent = ({
  onSelectPlatform,
  onSelectOrdering,
  gameQuery,
  onLoadMore,
}: Props) => {
  const [games, setGames] = useState<Game[]>([]);
  const [nextPage, setNextPage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const title =
    (gameQuery.genre ? gameQuery.genre.name + " " : "") +
    (gameQuery.platform ? gameQuery.platform.name : "");

  useEffect(() => {
    const params = {};

    if (gameQuery.genre) {
      params.genre = gameQuery.genre.id;
    }

    if (gameQuery.platform) {
      params.platform = gameQuery.platform.id;
    }

    if (gameQuery.search) {
      params.search = gameQuery.search;
    }

    if (gameQuery.sort) {
      params.sort = gameQuery.sort;
    }

    if (gameQuery.page) {
      params.page = gameQuery.page;
    }

    console.log(params);
    const { request, cancel } = GameService.getAll<Game>(params);

    request
      .then((response) => {
        if (response.data.next) setNextPage(response.data.next);
        else setNextPage("");
        if (gameQuery.page > 1) setGames([...games, ...response.data.results]);
        else setGames(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setErrorMessage(error.message);
        setLoading(false);
      });

    return () => cancel();
  }, [gameQuery]);

  return (
    <>
      {errorMessage}
      <Box paddingLeft={2}>
        <Heading as="h1">{title} Games</Heading>
        <GameFilters
          onSelectPlatform={onSelectPlatform}
          onSelectOrdering={onSelectOrdering}
        />
      </Box>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="10px"
        spacing={6}
      >
        {games.map((game) => (
          <GameCard game={game} key={game.id} />
        ))}
        {nextPage && (
          <Button onClick={onLoadMore}>
            {loading ? <Spinner /> : "Load More"}
          </Button>
        )}
      </SimpleGrid>
    </>
  );
};

export default GameContent;
