import { Grid, GridItem, Text } from "@chakra-ui/react";
import Header from "./components/Header";
import GenreList from "./components/GenreList";
import { useEffect, useState } from "react";
import { Genre } from "./services/genre-service";
import GameContent from "./components/GameContent";
import { PlatForm } from "./services/platform-service";
import { GameQueryVars } from "./services/game-service";

function Layout() {
  const [gameQuery, setGameQuery] = useState<GameQueryVars>({
    genre: null,
    platform: null,
    sort: "",
    search: "",
    page: 1,
  });

  useEffect(() => {}, []);

  const handleSelectGenre = (genre: Genre) => {
    setGameQuery({ ...gameQuery, page: 1, genre });
  };

  const handleSearch = (searchValue: string) => {
    setGameQuery({ ...gameQuery, page: 1, search: searchValue });
  };

  const handleSelectPlatform = (platform: PlatForm) => {
    // TODO
    setGameQuery({ ...gameQuery, page: 1, platform });
  };
  const handleSelectOrdering = (order: string) => {
    //TODO
    setGameQuery({ ...gameQuery, page: 1, sort: order });
  };

  const handleLoadMore = () => {
    //TODO
    setGameQuery({ ...gameQuery, page: gameQuery.page + 1 });
  };

  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "footer footer"`}
      gridTemplateRows={"50px 1fr 30px"}
      gridTemplateColumns={"150px 1fr"}
      h="200px"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
      width="100%"
    >
      <GridItem pl="2" area={"header"}>
        <Header onSearch={handleSearch} />
      </GridItem>
      <GridItem pl="2" area={"nav"}>
        <GenreList onSelectGenre={handleSelectGenre} />
      </GridItem>
      <GridItem pl="2" area={"main"}>
        <GameContent
          onSelectOrdering={handleSelectOrdering}
          onSelectPlatform={handleSelectPlatform}
          onLoadMore={handleLoadMore}
          gameQuery={gameQuery}
        />
      </GridItem>
      <GridItem pl="2" area={"footer"}>
        <Text>Intégration réalisé par Luc Alfred MBIDA</Text>
      </GridItem>
    </Grid>
  );
}

export default Layout;
